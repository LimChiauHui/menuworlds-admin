import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { makeStyles } from '@material-ui/styles';
import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Checkbox,
  Divider,
  Button,
  Link,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography
} from '@material-ui/core';

import getInitials from 'utils/getInitials';
import { ReviewStars, GenericMoreButton, TableEditBar } from 'components';

const useStyles = makeStyles(theme => ({
  root: {},
  content: {
    padding: 0
  },
  inner: {
    minWidth: 700
  },
  nameCell: {
    display: 'flex',
    alignItems: 'center'
  },
  avatar: {
    height: 42,
    width: 42,
    marginRight: theme.spacing(1)
  },
  actions: {
    padding: theme.spacing(1),
    justifyContent: 'flex-end'
  }
}));

const Results = props => {
  const { className, storeList, ...rest } = props;

  const classes = useStyles();

  const [selectedStore, setSelectedStore] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [displayIndex, setDisplayIndex] = useState(0);

  const handleSelectAll = event => {
    const selectedStore = event.target.checked
      ? storeList.map(store => store.id)
      : [];

    setSelectedStore(selectedStore);
  };

  const handleSelectOne = (event, id) => {
    const selectedIndex = selectedStore.indexOf(id);
    let newSelectedStore = [];

    if (selectedIndex === -1) {
      newSelectedStore = newSelectedStore.concat(selectedStore, id);
    } else if (selectedIndex === 0) {
      newSelectedStore = newSelectedStore.concat(selectedStore.slice(1));
    } else if (selectedIndex === selectedStore.length - 1) {
      newSelectedStore = newSelectedStore.concat(selectedStore.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelectedStore = newSelectedStore.concat(
        selectedStore.slice(0, selectedIndex),
        selectedStore.slice(selectedIndex + 1)
      );
    }

    setSelectedStore(newSelectedStore);
  };

  const handleChangePage = (event, page) => {
    setDisplayIndex(page*rowsPerPage);
    setPage(page);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(event.target.value);
  };

  return (
    <div {...rest} className={clsx(classes.root, className)}>
      <Typography color="textSecondary" gutterBottom variant="body2">
        {storeList.length} Records found. Page {page + 1} of{' '}
        {Math.ceil(storeList.length / rowsPerPage)}
      </Typography>
      <Card>
        {/* <CardHeader
          action={<GenericMoreButton />}
          title="All Store"
        /> */}
        <Divider />
        <CardContent className={classes.content}>
          <PerfectScrollbar>
            <div className={classes.inner}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={selectedStore.length === storeList.length}
                        color="primary"
                        indeterminate={
                          selectedStore.length > 0 &&
                          selectedStore.length < storeList.length
                        }
                        onChange={handleSelectAll}
                      />
                    </TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Phone</TableCell>
                    <TableCell>Latitude</TableCell>
                    <TableCell>Longitude</TableCell>
                    <TableCell>Ratings</TableCell>
                    <TableCell align="right">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {storeList.slice(displayIndex, displayIndex+rowsPerPage).map(store => (
                    <TableRow
                      hover
                      key={store.id}
                      selected={selectedStore.indexOf(store.id) !== -1}>
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={selectedStore.indexOf(store.id) !== -1}
                          color="primary"
                          onChange={event => handleSelectOne(event, store.id)}
                          value={selectedStore.indexOf(store.id) !== -1}
                        />
                      </TableCell>
                      <TableCell>
                        <div className={classes.nameCell}>
                          <Avatar className={classes.avatar} src={store.logo?.url}>
                            {getInitials(store.name)}
                          </Avatar>
                          {store.name}
                        </div>
                      </TableCell>
                      <TableCell>{store.phone_number}</TableCell>
                      <TableCell>{store.latitude}</TableCell>
                      <TableCell>{store.longitude}</TableCell>
                      <TableCell>
                        <ReviewStars value={store.avg_rating} />
                      </TableCell>
                      <TableCell align="right">
                        <Button
                          color="primary"
                          component={RouterLink}
                          size="small"
                          to={`/store/edit/${store.id}`}
                          variant="outlined">
                          Edit
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </PerfectScrollbar>
        </CardContent>
        <CardActions className={classes.actions}>
          <TablePagination
            component="div"
            count={storeList.length}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
            page={page}
            rowsPerPage={rowsPerPage}
            rowsPerPageOptions={[5, 10, 25]}
          />
        </CardActions>
      </Card>
      <TableEditBar selected={selectedStore} />
    </div>
  );
};

Results.propTypes = {
  className: PropTypes.string,
  storeList: PropTypes.array.isRequired
};

Results.defaultProps = {
  storeList: []
};

export default Results;
