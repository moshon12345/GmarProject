import React, {useCallback, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {useUser} from '../providers/UserProvider'; 
import useAxios from '../../hooks/useAxios';
import { changeUserPassword, checkCodeFromEmail, checkEmail, getUserApi, login, signUp} from '../services/usersApiService';
import { changeCallsLimits, changeIsAdmin, delete24hoursBlock } from '../services/userService';
import {
  getUser,
  removeToken,
  setTokenInLocalStorage,
} from '../services/localStorageService';
import ROUTES from '../../routes/routesModel';
import normalizeUser from '../helpers/normalization/normalizeUser';
import { getUsers } from '../../../src//users//services//usersApiService';
import { changeIsBusiness, deleteUser, editUser, changeAcceptedRates } from '../services/userService';
import {useSnack} from '..//..//..//src//providers//SnackbarProvider'; 

const useUsers = () => {
  const [users, setUsers] = useState (null);
  const [userApi, setUserApi] = useState (null);
  const [pending, setPending] = useState (false);
  const [error, setError] = useState (null);

  const navigate = useNavigate ();
  const {user, setUser, setToken} = useUser ();
  useAxios ();

  const {setSnack} = useSnack ();

  const requestStatus = useCallback (
    (pending, error, users, user, userApi = null) => {
      setPending (pending);
      setUsers (users);
      setUser (user);
      setUserApi (userApi)
      setError (error);
    },
    [setUser]
  );

  // 86400000
  const handleLogin = useCallback (
    async user => {
      try {
        let TwFHours = 86400000
        const token = await login (user);
          let currentTime = new Date();
          currentTime = currentTime.getTime();
        if (TwFHours - (currentTime-token["lastBadLogIn"]) < 0) 
          {
            setSnack ('success', 'You acount is not Block anymore. Now you can try Login');
            delete24hoursBlock(token["userId"])
            return
          }
        if (token == "wrongpassword") {
          setSnack ('error', 'Invalid email or password')
          navigate (ROUTES.LOGIN);
          return
        }


if (token["status"]) {
  if (token["status"] == "24 hours block") {
    let currentTime = new Date();
    currentTime = currentTime.getTime();
    setSnack ('error', `You acount (${user.email}) is Blocked for 24 hours from, Try Again about ` +  ((TwFHours-(currentTime-token["lastBadLogIn"]))/3600000).toFixed(2) + " hours from now");
    navigate (ROUTES.LOGIN);
    return
  }
}

        setToken (token);
        setTokenInLocalStorage (token);
        const userFromLocalStorage = getUser ();
        requestStatus (false, null, null, userFromLocalStorage);
        navigate (ROUTES.MOVIES);
      } catch (error) {
        requestStatus (false, error, null);
      }
    },
    [navigate, requestStatus, setToken]
  );

  const handleLogout = useCallback (
    () => {
      removeToken ();
      setUser (null);
    },
    [setUser]
  );

  const handleSignup = useCallback (
    async user => {
      try {
        setPending (true);
        const normalizedUser = normalizeUser (user);
        await signUp (normalizedUser);
        await handleLogin ({
          email: user.email,
          password: user.password,
        });
      } catch (error) {
        requestStatus (false, error, null);
      }
    },
    [handleLogin, requestStatus]
  );

  const handleGetUsers = async () => {
    try {
      setPending (true);
      const users = await getUsers ();
      // console.log(users)
      requestStatus (false, null, users, null);
    } catch (error) {
      requestStatus (false, error, null, null);
    }
  };

  const handleCheckEmail = async (email) => {
    try {
      setPending (true);
      const users = await checkEmail (email);
      if (users == "mail not exist") {
          setSnack ('error', 'Wrong Email, Email does not Exist');
      }
      if (users == "please enter the code") {
          navigate(`${ROUTES.NEW_PASSWORD}/${email}`)
        // setSnack ('error', 'Wrong Email, Email does not Exist');
      }
      requestStatus (false, null, users, null);
    } catch (error) {
      requestStatus (false, error, null, null);
    }
  };

  const handleCheckCodeFromMail = async (codeToCheck, email) => {
    try {
      setPending (true);
      const users = await checkCodeFromEmail (codeToCheck, email);
      requestStatus (false, null, users, null);
    } catch (error) {
      requestStatus (false, error, null, null);
    }
  };

  const handleChangePassword = async (valuePassword, email) => {
    try {
      setPending (true);
      const users = await changeUserPassword (valuePassword, email);
      requestStatus (false, null, users, null);
    } catch (error) {
      requestStatus (false, error, null, null);
    }
  };

  const handleGetUser = async (id) => {
    try {
      setPending (true);
      const userApi = await getUserApi (id);
      requestStatus (false, null, userApi, null);
    } catch (error) {
      requestStatus (false, error, null, null);
    }
  };

  const handleUpdateUser = useCallback (
    async (user, userId) => {
    try {
            setPending (true);
            const normalUser = normalizeUser (user);
            await editUser (normalUser, userId);
            // requestStatus (false, null, null, user);
            setSnack ('success', 'User been updated, PLEASE RE-LOGIN TO SEE THE CHANGES!');
            navigate (ROUTES.MOVIES);
          } catch (error) {
            requestStatus (false, error, null, null);
          }
    },
    []
  );

  const handleIsBusinessUser = useCallback (
    async (userId, isBusiness) => {
    try {
            setPending (true);
            await changeIsBusiness (userId, isBusiness);
            // setSnack ('success', 'User IsBusiness been updated');
          } catch (error) {
            requestStatus (false, error, null, null);
          }
    },
    []
  );

  const handleIsAdminUser = useCallback (
    async (userId, isUserAdmin) => {
    try {
            setPending (true);
            await changeIsAdmin (userId, isUserAdmin);
            navigate(ROUTES.USERS_PAGE)
            // setSnack ('success', 'User IsBusiness been updated');
          } catch (error) {
            requestStatus (false, error, null, null);
          }
    },
    []
  );
 
  const handleAcceptedVotes = useCallback (  
    async (acceptedVotes, user_id) => {
      // console.log(acceptedVotes)
      // console.log(user_id)
    try {
            setPending (true); 
            let acceptedVoteStatus = await changeAcceptedRates (acceptedVotes, user_id);
            // console.log(acceptedVoteStatus)
            if (acceptedVoteStatus == "The accepted votes is updated") {
                setSnack ('success', 'The accepted votes is updated');
            }
          } catch (error) {
            requestStatus (false, error, null, null);
          }
    },
    []
  );

  const handleAcceptedCalls = useCallback (  
    async (callsLimit, user_id) => {
    try {
            setPending (true); 
            let acceptedVoteStatus = await changeCallsLimits (callsLimit, user_id);
            if (acceptedVoteStatus == "The accepted Calls is updated") {
                localStorage.setItem("managerChangeCallsAbilities?", "YES")
                navigate(ROUTES.USERS_PAGE) 
            }
          } catch (error) {
            requestStatus (false, error, null, null);
          }
       },
    []
  );

  const handleDeleteUser = useCallback (
    async (userId) => {
    try {
            setPending (true);
            await deleteUser (userId);
            // setSnack ('success', 'User has been Deleted');
          } catch (error) {
            requestStatus (false, error, null, null);
          }
        },
    []
  );


  return {
    pending,
    error,
    user,
    users,
    userApi,
    handleLogin,
    handleLogout,
    handleSignup,
    handleGetUsers,
    handleUpdateUser,
    handleGetUser,
    handleIsAdminUser,
    handleCheckEmail,
    handleCheckCodeFromMail,
    handleIsBusinessUser,
    handleChangePassword,
    handleAcceptedCalls,
    handleAcceptedVotes,
    handleDeleteUser,
  };
};

export default useUsers;
