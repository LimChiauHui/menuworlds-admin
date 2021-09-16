import { logout } from 'app/auth/authSlice';
import axios from 'axios';
import { useDispatch } from 'react-redux';
axios.defaults.baseURL = process.env.REACT_APP_API_URL;
// Request interceptor for API calls
axios.interceptors.request.use(
  async config => {
    config.headers = {
      Accept: 'application/json;multipart/form-data'
    };
    const token = await localStorage.getItem('user_token');
    if (token) {
      config.headers = {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json;multipart/form-data'
      };
    }
    return config;
  },
  error => {
    Promise.reject(error);
  }
);

// Response interceptor for API calls
axios.interceptors.response.use(
  response => {
    return response;
  },
  async function(error) {
    console.log('this is error');
    console.log(error.response);

    return Promise.resolve(error.response);
  }
);
export default axios;
