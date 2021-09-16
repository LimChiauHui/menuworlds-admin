import React, { useEffect } from 'react';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import MomentUtils from '@date-io/moment';
import { useDispatch, useSelector } from 'react-redux';
import { ThemeProvider } from '@material-ui/styles';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import { renderRoutes } from 'react-router-config';

import { login } from 'app/auth/authSlice';
import theme from './theme';
import routes from './routes';
import AuthPage from './views/0.Auth/Login';
import {
  ScrollReset,
  GoogleAnalytics,
  CookiesNotification
} from './components';
import './mixins/chartjs';
import './mixins/moment';
import './mixins/validate';
import './mixins/prismjs';
import './mock';
import './assets/scss/index.scss';

const history = createBrowserHistory();

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const token = localStorage.getItem('user_token');
    if (token) {
      dispatch(login({ token }));
    } else {
      return;
    }
  }, []);
  let isAuth = useSelector(state => state.auth.isLoggedIn);
  const token = localStorage.getItem('user_token');
  if (token) {
    isAuth = true
  }
  return (
    <ThemeProvider theme={theme}>
      <MuiPickersUtilsProvider utils={MomentUtils}>
        <Router history={history}>
          <ScrollReset />
          <GoogleAnalytics />
          <CookiesNotification />
          {isAuth ? renderRoutes(routes) : <AuthPage />}
        </Router>
      </MuiPickersUtilsProvider>
    </ThemeProvider>
  );
};

export default App;
