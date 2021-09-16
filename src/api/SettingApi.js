import axios from 'utils/axios1/AxiosHandler';

export const SettingApi = {
  getAllArea: async () => {
    return axios.get('api/adminpanel/admin-panel-areas');
  },
  getAllStoreType: async () => {
    return axios.get('api/adminpanel/admin-panel-store-type');
  },
  getOrderById: async payload => {
    return axios.get(`api/adminpanel/get-order-by-order-id/${payload}`);
  }
};
