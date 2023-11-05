import axios from 'axios';

const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:8181';

export const login = async user => {
  try {
    const {data} = await axios.post (`${apiUrl}/users/login`, user);
    return data;
  } catch (error) {
    return Promise.reject (error.message);
  }
};

export const signUp = async user => {
  try {
    const {data} = await axios.post (`${apiUrl}/users`, user);
    return data;
  } catch (error) {
    return Promise.reject (error.message);
  }
};

export const getUsers = async () => {
  try {
    const {data} = await axios.get (`${apiUrl}/users`);
    return data;
  } catch (error) {
    return Promise.reject (error.message);
  }
};

export const checkEmail = async (email) => {
  try {
    const {data} = await axios.get (`${apiUrl}/users/${email}`);
    return data;
  } catch (error) {
    return Promise.reject (error.message);
  }
};

export const changeUserPassword = async (valuePassword, email) => {
  try {
    const {data} = await axios.post (`${apiUrl}/users/UserReP`, [valuePassword, email]);
    return data;
  } catch (error) {
    return Promise.reject (error.message);
  }
};

export const checkCodeFromEmail = async (codeToCheck, email) => {
  try {
    const {data} = await axios.get (`${apiUrl}/users/code/${codeToCheck}/${email}`);
    return data;
  } catch (error) {
    return Promise.reject (error.message);
  }
};

export const getUserApi = async (id) => {
  try {
    const {data} = await axios.get (`${apiUrl}/users/${id}`);
    return data;
  } catch (error) {
    return Promise.reject (error.message);
  }
};