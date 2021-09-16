import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';

import { Page, SearchBar } from 'components';
import { Header, Results } from './components';
import { OrderApi } from 'api/OrderApi';
import { Crypto } from 'utils/crypto/crypto';
import { useDispatch } from 'react-redux';
import { logout } from 'app/auth/authSlice';
const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  results: {
    marginTop: theme.spacing(3)
  }
}));

const OrderListPage = () => {
  const classes = useStyles();

  const [orderList, setOrderList] = useState([]);
  const [isLoading, setIsloading] = useState(false);
  const [filteredOrderList, setFilteredOrderList] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    getOrders();
  }, []);

  const getOrders = async () => {
    setIsloading(true);
    const result = await OrderApi.getAllOrder();
    if (result.status === 200) {
      const data = Crypto.decryption(result.data.data);
      const res = JSON.parse(data);
      console.log(res);
      setOrderList(res);
      setFilteredOrderList(res);
    } else if (result.status === 401) {
      dispatch(logout());
    }
    setIsloading(false);
  };

  const handleFilter = () => {};
  const handleSearch = () => {};

  return (
    <Page className={classes.root} title="All Order">
      <Header />
      <SearchBar onFilter={handleFilter} onSearch={handleSearch} />
      {isLoading && 'Loading'}
      {(!isLoading &&filteredOrderList) && (
        <Results className={classes.results} orderList={filteredOrderList} />
      )}
    </Page>
  );
};

export default OrderListPage;
