import axios from 'axios';

const FIREBASE_BACKEND_AUTH_URL =
  'https://identitytoolkit.googleapis.com/v1/accounts:';
const FIREBASE_API_KEY = '?key=AIzaSyAV_TSX1quIfBUf4Wfa_TNxi7AUfXs4cAs';

export const refreshSessionTokenApi = async (refreshToken) => {
  const url = `https://securetoken.googleapis.com/v1/token${FIREBASE_API_KEY}`;

  const response = await axios.post(url, {
    grant_type: 'refresh_token',
    refresh_token: refreshToken,
  });

  return response.data;
};

export const authenticateUserApi = async (mode, userData) => {
  const url = `${FIREBASE_BACKEND_AUTH_URL}${mode}${FIREBASE_API_KEY}`;

  const response = await axios.post(url, {
    email: userData.email,
    password: userData.password,
    returnSecureToken: true,
  });

  const token = response.data.idToken;
  const refreshToken = response.data.refreshToken;

  return { token, refreshToken };
};

export const createUserApi = (userData) => {
  const mode = 'signUp';
  return authenticateUserApi(mode, userData);
};

export const loginUserApi = (userData) => {
  const mode = 'signInWithPassword';
  return authenticateUserApi(mode, userData);
};

export const logoutUserApi = async (token) => {
  const FIREBASE_URL = `https://expense-traker-b09b7-default-rtdb.firebaseio.com/message.json?auth=${token}`;

  const message = await axios
    .get(FIREBASE_URL)
    .then((response) => response.data);
  return message;
};
