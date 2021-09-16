import { createSlice } from '@reduxjs/toolkit';

const initialState = { isLoggedIn: false, token: '' };
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      state.token = action.payload.token;
      state.isLoggedIn = true;
      localStorage.setItem('user_token', action.payload.token);
    },
    setUserInfo: (state, action) => {
      state.user = action.payload.user;
      localStorage.setItem('user_info', JSON.stringify(action.payload.user));
    },
    logout: state => {
      state.token = '';
      state.isLoggedIn = false;
      localStorage.removeItem('user_token');
      localStorage.removeItem('user_info');
    },
  }
});

export const { login, logout, setUserInfo } = authSlice.actions;
export default authSlice.reducer;
