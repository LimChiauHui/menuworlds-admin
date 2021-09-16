import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';

import { Crypto } from 'utils/crypto/crypto';
import { Page, SearchBar } from 'components';
import { Header, Results } from './components';
import { StoreApi } from 'api/StoreApi';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  results: {
    marginTop: theme.spacing(3)
  }
}));

const StorePage = () => {
  const classes = useStyles();

  const [storeList, setStoreList] = useState([]);
  const [filteredList, setFilteredList] = useState([]);

  useEffect(() => {
    getStores();
  }, []);

  const getStores = async () => {
    const result = await StoreApi.getAllStore();
    const data = Crypto.decryption(result.data.data);
    const res = JSON.parse(data);
    setStoreList(res);
    setFilteredList(res);
  };

  const handleFilter = () => {};
  const handleSearch = value => {
    if (value) {
      const lowerValue = value.toLowerCase();
      setFilteredList(
        storeList.filter(store => {
          return store.name.toLowerCase().indexOf(lowerValue) !== -1;
        })
      );
    } else {
      setFilteredList(storeList);
    }
  };

  return (
    <Page className={classes.root} title="All Store List">
      <Header />
      <SearchBar onFilter={handleFilter} onSearch={handleSearch} />
      {filteredList && (
        <Results className={classes.results} storeList={filteredList} />
      )}
    </Page>
  );
};

export default StorePage;
