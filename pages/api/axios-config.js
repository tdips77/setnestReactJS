// axios-config.js

import axios from 'axios';
// const cognitoId = localStorage.getItem("cognitoId") ? localStorage.getItem("cognitoId") : ""
const axiosInstance = axios.create({
  baseURL: "https://mr4rf2cwse.execute-api.ap-south-1.amazonaws.com/uat/",
  headers: {
    'Content-Type': 'application/json',
    // Add your specific headers here conditionally
    ...(process.env.TOKEN && { 'token': process.env.TOKEN }),
    ...(process.env.ID && { 'id': process.env.ID }),
    ...(process.env.ROLE && { 'role': process.env.ROLE }),
    // 'cognitoId': cognitoId,
  },
});



function findIdTokenKey() {
  if (typeof window !== 'undefined') {
  for (var key in localStorage) {
      if (key.endsWith('idToken')) {
          return key;
      }
  }
}
  return null; // Return null if idToken key not found
}

var idTokenKey = findIdTokenKey();
axiosInstance.interceptors.request.use(
  (config) => {
    const cognitoId = localStorage.getItem('cognitoId'); // Retrieve token from localStorage
    const id = localStorage.getItem('id');
    const idToken = localStorage.getItem(idTokenKey)
    if (cognitoId) {
      config.headers.cognitoId = cognitoId; // Add token to the Authorization header
    }
    if (id) {
      config.headers.id = id; // Add id to the header
    }
    if (idTokenKey) {
      config.headers.token = idToken;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
