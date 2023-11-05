import axios from 'axios';
import {useSnack} from '../providers/SnackbarProvider';
import {useUser} from '../users/providers/UserProvider';
import {useBlockUser} from '../users/providers/UserProvider';
import {useEffect} from 'react';
import useUsers from '../users/hooks/useUsers';
import { useNavigate } from "react-router-dom";
import ROUTES from '../routes/routesModel';

const useAxios = () => {
  const navigate = useNavigate();
  const {setSnack} = useSnack ();
  const {token} = useUser ();
  const {user} = useUser ();
  // let dataToCheck = ''
  // const {user} = useBlockUser ();

  const countingCalls = () => { 
    // handleGetUsers()
    if (!localStorage.getItem(`${user._id}`)) {
         const date = new Date();
         localStorage.setItem(`${user._id}`, JSON.stringify({
                  userId: user._id,
                  numberOfCallLast24H: 1,
                  timeOfStartCounting: date.getTime(),
                  timeOfTheLastCall: date.getTime(),
  }))
  // if ((localStorage.getItem(`${user._id}`)) && )
  } else {
       const date = new Date();
       let currentData = JSON.parse(localStorage.getItem(`${user._id}`));
       localStorage.removeItem(`${user._id}`)
       // console.log(currentData)
       localStorage.setItem(`${user._id}`, JSON.stringify({
                  userId: currentData.userId,
                  numberOfCallLast24H: (currentData.numberOfCallLast24H + 1),
                  timeOfStartCounting:  currentData.timeOfStartCounting,
                  timeOfTheLastCall: date.getTime(),
                  calculateOfTime: (currentData.timeOfTheLastCall - currentData.timeOfStartCounting)
  }))

  if (currentData.calculateOfTime > 86400000) {
      localStorage.removeItem(`${user._id}`)
  }

  }
    if (localStorage.getItem(`${user._id}`)) {
    let TwFHours = 86400000
    let dataToCheck = JSON.parse(localStorage.getItem(`${user._id}`));
    if ((dataToCheck.calculateOfTime < TwFHours) && (dataToCheck.numberOfCallLast24H >= user.acceptedCallPerDay)) {
         blockUser()
  }
  }
}

const blockUser = () => { 
      navigate(ROUTES.BLOCK_USER_PAGE)
}

  useEffect (
    () => {
// console.log("Axios")
  if (user) { 
    if (!user.isUserSourceAdmin) {
         countingCalls(user._id)
    } 
  }
      axios.defaults.headers.common['x-auth-token'] = token;
      // console.log(token)
      axios.interceptors.request.use (data => {
        return Promise.resolve (data);
      }, null);

      axios.interceptors.response.use (
        data => {
          return Promise.resolve (data);
        },
        error => {
          setSnack ('error', error.message);
          return Promise.reject (error);
        }
      );
    },
    [token, setSnack]
  );
};

export default useAxios;
