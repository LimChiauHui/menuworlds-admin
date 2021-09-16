import axios from 'utils/axios1/AxiosHandler';

export const AuthApi = {
  getToken: async payload => {
    return axios.post('oauth/token', payload);
  },
  getUserInfo: async () => {
    return axios.get('api/adminpanel/get-user-info');
  }
};
