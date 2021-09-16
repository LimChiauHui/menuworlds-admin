import axios from 'utils/axios1/AxiosHandler';
import axiosFD from 'axios';

export const StoreApi = {
  getAllStore: async () => {
    return axios.get('api/adminpanel/get-all-restaurant');
  },
  getStoreSetting: async restaurant_id => {
    return axios.get(
      `api/adminpanel/get-all-restaurant-settings/${restaurant_id}`
    );
  },
  addStore: async payload => {
    const fd = new FormData();
    const token = await localStorage.getItem('user_token');
    fd.append('data', payload.data);
    if (payload.logo) {
      fd.append('logo', payload.logo);
    }
    if (payload.banner) {
      fd.append('banner', payload.banner);
    }
    if (payload.ssm_document) {
      fd.append('ssm_document', payload.ssm_document);
    }
    if (payload.letter_authorization) {
      fd.append('letter_authorization', payload.letter_authorization);
    }

    return axiosFD.post('api/adminpanel/store-new-restaurant', fd, {
      headers: {
        Authorization: `Bear ${token}`,
        'Content-Type': 'Multipart/form-data'
      }
    });
  },
  editStoreDetail: async payload => {
    const fd = new FormData();
    const token = await localStorage.getItem('user_token');
    fd.append('data', payload.data);
    if (payload.logo) {
      fd.append('logo', payload.logo);
    }
    if (payload.banner) {
      fd.append('banner', payload.banner);
    }
    if (payload.ssm_document) {
      fd.append('ssm_document', payload.ssm_document);
    }
    if (payload.letter_authorization) {
      fd.append('letter_authorization', payload.letter_authorization);
    }

    return axiosFD.post(
      `api/adminpanel/update-new-restaurant/${payload.id}`,
      fd,
      {
        headers: {
          Authorization: `Bear ${token}`,
          'Content-Type': 'Multipart/form-data'
        }
      }
    );
  }
};
