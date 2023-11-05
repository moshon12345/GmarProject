import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {useSnack} from '..//..//..//src//providers//SnackbarProvider';
import ROUTES from '../../routes/routesModel';

const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:8181';

export const editUser = async (user, userId) => {
  try {
    const {data} = await axios.put (`${apiUrl}/users/${userId}`, [user]);
    return Promise.resolve(data);
  } catch (error) {
    return Promise.reject (error.messgae);
  }
};

export const changeIsBusiness  = async (userId, isBusiness) => {
  try {
    const {data} = await axios.post (`${apiUrl}/users/${userId}`);
    localStorage.setItem("IsUpdated", "YES");
    return Promise.resolve(data);
  } catch (error) {
    return Promise.reject (error.messgae);
  }
};

export const changeIsAdmin  = async (userId, isUserAdmin) => {
  
  try {
    const {data} = await axios.put (`${apiUrl}/users/admin/${userId}/${isUserAdmin}`);
    localStorage.setItem("IsManagerTouchAdmin", "YES"); 
    // localStorage.setItem("IsUpdated", "YES");
    return Promise.resolve(data);
  } catch (error) {
    return Promise.reject (error.messgae);
  }
};

export const changeAcceptedRates  = async (acceptedVotes, user_id) => {  
  try {
    const {data} = await axios.post (`${apiUrl}/users/${user_id}/${acceptedVotes}`);
    return Promise.resolve(data);
  } catch (error) {
    return Promise.reject (error.messgae);
  }
};

export const changeCallsLimits  = async (callsLimit, user_id) => {  
  try {
    const {data} = await axios.post (`${apiUrl}/users/calls/${user_id}/${callsLimit}`);
    return Promise.resolve(data);
  } catch (error) {
    return Promise.reject (error.messgae);
  }
};

export const deleteUser  = async (userId) => {
  try {
    const {data} = await axios.delete (`${apiUrl}/users/${userId}`);
    return Promise.resolve(data);
  } catch (error) {
    return Promise.reject (error.messgae);
  }
};

export const delete24hoursBlock  = async (userId) => {
  try {
    const {data} = await axios.delete (`${apiUrl}/users/delete24/${userId}`);
    return Promise.resolve(data);
  } catch (error) {
    return Promise.reject (error.messgae);
  }
};

