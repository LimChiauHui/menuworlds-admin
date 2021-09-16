import React, { useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import moment from 'moment';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardHeader,
  CardContent,
  TextField,
  Chip,
  Typography
} from '@material-ui/core';
import { DatePicker } from '@material-ui/pickers';
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';
import { Alert } from 'components';
import { MultiSelect } from 'views/ProjectList/components/Filter/components';

const useStyles = makeStyles(theme => ({
  root: {},
  alert: {
    marginBottom: theme.spacing(3)
  },
  formGroup: {
    marginBottom: theme.spacing(3)
  },
  fieldGroup: {
    display: 'flex',
    alignItems: 'center'
  },
  fieldHint: {
    margin: theme.spacing(1, 0)
  },
  tags: {
    marginTop: theme.spacing(1),
    '& > * + *': {
      marginLeft: theme.spacing(1)
    }
  },
  flexGrow: {
    flexGrow: 1
  },
  dateField: {
    '& + &': {
      marginLeft: theme.spacing(2)
    }
  }
}));

const StoreDetailForm = props => {
  const { className, ...rest } = props;

  const classes = useStyles();

  const initialValues = {
    name: '',
    tag: '',
    tags: ['Full-Time', 'ReactJS'],
    startDate: moment(),
    endDate: moment().add(1, 'day')
  };

  const [values, setValues] = useState({ ...initialValues });
  const [calendarTrigger, setCalendarTrigger] = useState(null);
  const [resTypeChips, setResTypeChips] = useState([]);
  const [resTagChips, setResTagChips] = useState([]);

  const handleResTypeChipDelete = chip => {
    setResTypeChips(chips => chips.filter(c => chip !== c));
  };

  const handleResTypeMultiSelectChange = value => {
    setResTypeChips(value);
  };
  const handleResTagChipDelete = chip => {
    setResTagChips(chips => chips.filter(c => chip !== c));
  };

  const handleResTagMultiSelectChange = value => {
    setResTagChips(value);
  };
  const handleFieldChange = (event, field, value) => {
    event.persist && event.persist();
    setValues(values => ({
      ...values,
      [field]: value
    }));
  };

  const handleCalendarOpen = trigger => {
    setCalendarTrigger(trigger);
  };

  const handleCalendarChange = () => {};

  const handleCalendarAccept = date => {
    setValues(values => ({
      ...values,
      [calendarTrigger]: date
    }));
  };

  const handleCalendarClose = () => {
    setCalendarTrigger(false);
  };
  const RestaurantTypeSelection = {
    label: 'Restaurant Type',
    options: ['Homemade', 'Local', 'A', 'B']
  };
  const RestaurantTagSelection = {
    label: 'Restaurant Tags',
    options: ['Western', 'Japanese', 'Fast Food']
  };
  const calendarOpen = Boolean(calendarTrigger);
  const calendarMinDate =
    calendarTrigger === 'startDate'
      ? moment()
      : moment(values.startDate).add(1, 'day');
  const calendarValue = values[calendarTrigger];

  return (
    <Card {...rest} className={clsx(classes.root, className)}>
      <CardHeader title="Store Detail" />
      <CardContent>
        <form>
          <div className={classes.formGroup}>
            <TextField
              fullWidth
              label="Store Name"
              name="name"
              onChange={event =>
                handleFieldChange(event, 'name', event.target.value)
              }
              value={values.name}
              variant="outlined"
            />
          </div>

          <div className={classes.formGroup}>
            <TextField
              fullWidth
              label="Store Address"
              name="name"
              onChange={event =>
                handleFieldChange(event, 'name', event.target.value)
              }
              value={values.name}
              variant="outlined"
            />
          </div>

          <div className={classes.formGroup}>
            <TextField
              fullWidth
              label="Phone Number"
              name="name"
              onChange={event =>
                handleFieldChange(event, 'name', event.target.value)
              }
              value={values.name}
              variant="outlined"
            />
          </div>

          <div className={classes.formGroup}>
            <TextField
              fullWidth
              label="Store Name"
              name="name"
              onChange={event =>
                handleFieldChange(event, 'name', event.target.value)
              }
              value={values.name}
              variant="outlined"
            />
          </div>
          <div className={classes.formGroup}>
            <MultiSelect
              key={RestaurantTypeSelection.label}
              label={RestaurantTypeSelection.label}
              onChange={handleResTypeMultiSelectChange}
              options={RestaurantTypeSelection.options}
              value={resTypeChips}
            />
            <div className={classes.chips}>
              {resTypeChips.map(chip => (
                <Chip
                  className={classes.chip}
                  deleteIcon={<CloseIcon />}
                  key={chip}
                  label={chip}
                  onDelete={() => handleResTypeChipDelete(chip)}
                />
              ))}
            </div>
          </div>
          <div className={classes.formGroup}>
            <MultiSelect
              key={RestaurantTagSelection.label}
              label={RestaurantTagSelection.label}
              onChange={handleResTagMultiSelectChange}
              options={RestaurantTagSelection.options}
              value={resTagChips}
            />
            <div className={classes.chips}>
              {resTagChips.map(chip => (
                <Chip
                  className={classes.chip}
                  deleteIcon={<CloseIcon />}
                  key={chip}
                  label={chip}
                  onDelete={() => handleResTagChipDelete(chip)}
                />
              ))}
            </div>
          </div>
          <div className={classes.formGroup}>
            <div className={classes.fieldGroup}>
              <TextField
                className={classes.dateField}
                label="Start Date"
                name="startDate"
                onClick={() => handleCalendarOpen('startDate')}
                value={moment(values.startDate).format('DD/MM/YYYY')}
                variant="outlined"
              />
              <TextField
                className={classes.dateField}
                label="End Date"
                name="endDate"
                onClick={() => handleCalendarOpen('endDate')}
                value={moment(values.endDate).format('DD/MM/YYYY')}
                variant="outlined"
              />
            </div>
          </div>
        </form>
      </CardContent>
      <DatePicker
        minDate={calendarMinDate}
        onAccept={handleCalendarAccept}
        onChange={handleCalendarChange}
        onClose={handleCalendarClose}
        open={calendarOpen}
        style={{ display: 'none' }} // Temporal fix to hide the input element
        value={calendarValue}
        variant="dialog"
      />
    </Card>
  );
};

StoreDetailForm.propTypes = {
  className: PropTypes.string
};

export default StoreDetailForm;
