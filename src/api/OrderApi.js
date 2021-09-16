import axios from 'utils/axios1/AxiosHandler';

export const OrderApi = {
  getAllOrder: async () => {
    return axios.get('api/adminpanel/get-all-order');
  },
  getOrderById: async payload => {
    return axios.get(`api/adminpanel/get-order-by-order-id/${payload}`);
  }
};
