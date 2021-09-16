import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';

import { Page } from 'components';
import { Header, Form } from './components';
import { StoreApi } from 'api/StoreApi';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  form: {
    marginTop: theme.spacing(3)
  }
}));

const StorePage = () => {
  const classes = useStyles();

  //   const [customers, setCustomers] = useState([]);

  //   useEffect(() => {
  //     let mounted = true;

  //     const fetchCustomers = async () => {
  //       // const result = await StoreApi.getStore();
  //       axios.get('/api/management/customers').then(response => {
  //         if (mounted) {
  //           setCustomers(response.data.customers);
  //         }
  //       });
  //     };

  //     fetchCustomers();

  //     return () => {
  //       mounted = false;
  //     };
  //   }, []);

  const handleFilter = () => {};
  const handleSearch = () => {};

  return (
    <Page className={classes.root} title="Add Store">
      <Header />
      <Form className={classes.form} />
    </Page>
  );
};

export default StorePage;
