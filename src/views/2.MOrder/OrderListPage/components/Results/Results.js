import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardActions,
  CardContent,
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

import {  TableEditBar } from 'components';

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
  const { className, orderList, ...rest } = props;
  const classes = useStyles();

  const [selectedOrder, setSelectedOrder] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [displayIndex, setDisplayIndex] = useState(0);

  const handleSelectAll = event => {
    const selectedOrder = event.target.checked
      ? orderList.map(order => order.id)
      : [];

    setSelectedOrder(selectedOrder);
  };

  const handleSelectOne = (event, id) => {
    const selectedIndex = selectedOrder.indexOf(id);
    let newselectedOrder = [];

    if (selectedIndex === -1) {
      newselectedOrder = newselectedOrder.concat(selectedOrder, id);
    } else if (selectedIndex === 0) {
      newselectedOrder = newselectedOrder.concat(selectedOrder.slice(1));
    } else if (selectedIndex === selectedOrder.length - 1) {
      newselectedOrder = newselectedOrder.concat(selectedOrder.slice(0, -1));
    } else if (selectedIndex > 0) {
      newselectedOrder = newselectedOrder.concat(
        selectedOrder.slice(0, selectedIndex),
        selectedOrder.slice(selectedIndex + 1)
      );
    }

    setSelectedOrder(newselectedOrder);
  };

  const handleChangePage = (event, page) => {
    setDisplayIndex(page * rowsPerPage);
    setPage(page);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(event.target.value);
  };

  return (
    <div {...rest} className={clsx(classes.root, className)}>
      <Typography color="textSecondary" gutterBottom variant="body2">
        {orderList.length} Records found. Page {page + 1} of
        {Math.ceil(orderList.length / rowsPerPage)}
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
                        checked={selectedOrder.length === orderList.length}
                        color="primary"
                        indeterminate={
                          selectedOrder.length > 0 &&
                          selectedOrder.length < orderList.length
                        }
                        onChange={handleSelectAll}
                      />
                    </TableCell>
                    <TableCell>UID</TableCell>
                    <TableCell>Client</TableCell>
                    <TableCell>Restaurant</TableCell>
                    <TableCell>Order Type</TableCell>
                    <TableCell>Payment</TableCell>
                    <TableCell>Total Price</TableCell>
                    <TableCell>Order Remark</TableCell>
                    <TableCell>Created At</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell align="right">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {orderList
                    .slice(displayIndex, displayIndex+rowsPerPage)
                    .map(order => (
                      <TableRow
                        hover
                        key={order.id}
                        selected={selectedOrder.indexOf(order.id) !== -1}>
                        <TableCell padding="checkbox">
                          <Checkbox
                            checked={selectedOrder.indexOf(order.id) !== -1}
                            color="primary"
                            onChange={event => handleSelectOne(event, order.id)}
                            value={selectedOrder.indexOf(order.id) !== -1}
                          />
                        </TableCell>
                        <TableCell> {order.unique_code}</TableCell>
                        <TableCell> {order.client_id}</TableCell>
                        <TableCell>{order.restaurant_id}</TableCell>
                        <TableCell>{order.order_type_id}</TableCell>
                        <TableCell>{order.payment_method_id}</TableCell>
                        <TableCell>{order.total_price}</TableCell>
                        <TableCell>{order.remark}</TableCell>
                        <TableCell>{order.created_at}</TableCell>
                        <TableCell>{order.status_id}</TableCell>

                        <TableCell align="right">
                          <Button
                            color="primary"
                            component={RouterLink}
                            size="small"
                            to="/management/customers/1"
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
            count={orderList.length}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
            page={page}
            rowsPerPage={rowsPerPage}
            rowsPerPageOptions={[5, 10, 25]}
          />
        </CardActions>
      </Card>
      <TableEditBar selected={selectedOrder} />
    </div>
  );
};

Results.propTypes = {
  className: PropTypes.string,
  orderList: PropTypes.array.isRequired
};

Results.defaultProps = {
  orderList: []
};

export default Results;
