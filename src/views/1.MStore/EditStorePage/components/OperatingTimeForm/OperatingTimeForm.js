import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Card,
  CardHeader,
  CardContent,
  TextField,
  Grid,
  Chip,
  Button,
  Select,
  NativeSelect,
  Typography,
  FormControlLabel,
  Checkbox,
  Link,
  Tabs,
  Tab,
  Divider,
  colors
} from '@material-ui/core';
import { Page } from 'components';
import { SettingApi } from 'api/SettingApi';
import { StoreApi } from 'api/StoreApi';
import { Crypto } from 'utils/crypto/crypto';

const useStyles = makeStyles(theme => ({
  root: {
    width: theme.breakpoints.values.lg,
    maxWidth: '100%',
    margin: '0 auto',
    padding: theme.spacing(3, 3, 6, 3)
  },
  aboutAuthor: {
    marginTop: theme.spacing(3)
  },
  aboutProject: {
    marginTop: theme.spacing(3)
  },
  projectCover: {
    marginTop: theme.spacing(3)
  },
  projectDetails: {
    marginTop: theme.spacing(3)
  },
  preferences: {
    marginTop: theme.spacing(3)
  },
  actions: {
    marginTop: theme.spacing(3)
  },
  Froot: {
    marginTop: theme.spacing(3)
  },
  Falert: {
    marginBottom: theme.spacing(3)
  },
  FformGroup: {
    marginBottom: theme.spacing(3)
  },
  FfieldGroup: {
    display: 'flex',
    alignItems: 'center'
  },
  FfieldHint: {
    margin: theme.spacing(1, 0)
  },
  Ftags: {
    marginTop: theme.spacing(1),
    '& > * + *': {
      marginLeft: theme.spacing(1)
    }
  },
  FflexGrow: {
    flexGrow: 1
  },
  FdateField: {
    '& + &': {
      marginLeft: theme.spacing(2)
    }
  },
  image: {
    maxWidth: '200px'
  }
}));

const OperatingTimeForm = ({ operatingSetting }) => {
  const classes = useStyles();
  const [values, setValues] = useState();
  const [arrayLoop, setArrayLoop] = useState([]);

  useEffect(() => {
    setValues({
      0: {
        day: 0,
        name: 'Monday',
        opening_time: operatingSetting[0].opening_time,
        closing_time: operatingSetting[0].closing_time,
        rest_start_time: operatingSetting[0].rest_start_time,
        rest_close_time: operatingSetting[0].rest_close_time,
        is_rest: operatingSetting[0].is_rest == '1' ? true : false,
        status: operatingSetting[0].status == 'Close' ? false : true
      },
      1: {
        day: 1,
        name: 'Tuesday',
        opening_time: operatingSetting[1].opening_time,
        closing_time: operatingSetting[1].closing_time,
        rest_start_time: operatingSetting[1].rest_start_time,
        rest_close_time: operatingSetting[1].rest_close_time,
        is_rest: operatingSetting[1].is_rest == '1' ? true : false,
        status: operatingSetting[1].status == 'Close' ? false : true
      },
      2: {
        day: 2,
        name: 'Wednesday',
        opening_time: operatingSetting[2].opening_time,
        closing_time: operatingSetting[2].closing_time,
        rest_start_time: operatingSetting[2].rest_start_time,
        rest_close_time: operatingSetting[2].rest_close_time,
        is_rest: operatingSetting[2].is_rest == '1' ? true : false,
        status: operatingSetting[2].status == 'Close' ? false : true
      },
      3: {
        day: 3,
        name: 'Thursday',
        opening_time: operatingSetting[3].opening_time,
        closing_time: operatingSetting[3].closing_time,
        rest_start_time: operatingSetting[3].rest_start_time,
        rest_close_time: operatingSetting[3].rest_close_time,
        is_rest: operatingSetting[3].is_rest == '1' ? true : false,
        status: operatingSetting[3].status == 'Close' ? false : true
      },
      4: {
        day: 4,
        name: 'Friday',
        opening_time: operatingSetting[4].opening_time,
        closing_time: operatingSetting[4].closing_time,
        rest_start_time: operatingSetting[4].rest_start_time,
        rest_close_time: operatingSetting[4].rest_close_time,
        is_rest: operatingSetting[4].is_rest == '1' ? true : false,
        status: operatingSetting[4].status == 'Close' ? false : true
      },
      5: {
        day: 5,
        name: 'Saturday',
        opening_time: operatingSetting[5].opening_time,
        closing_time: operatingSetting[5].closing_time,
        rest_start_time: operatingSetting[5].rest_start_time,
        rest_close_time: operatingSetting[5].rest_close_time,
        is_rest: operatingSetting[5].is_rest == '1' ? true : false,
        status: operatingSetting[5].status == 'Close' ? false : true
      },
      6: {
        day: 6,
        name: 'Sunday',
        opening_time: operatingSetting[6].opening_time,
        closing_time: operatingSetting[6].closing_time,
        rest_start_time: operatingSetting[6].rest_start_time,
        rest_close_time: operatingSetting[6].rest_close_time,
        is_rest: operatingSetting[6].is_rest == '1' ? true : false,
        status: operatingSetting[6].status == 'Close' ? false : true
      }
    });
    setArrayLoop([0, 1, 2, 3, 4, 5, 6]);
  }, []);

  const handleFieldChange = (event, index, field, value) => {
    console.log(values);
    event.persist && event.persist();
    setValues(values => ({ ...values, [index]: value }));
  };

  const getForm = async () => {
    const encryptedData = Crypto.encryption(values);
    // const result = await StoreApi.addStore(payload);
    // console.log(result);
  };

  return (
    <>
      {arrayLoop.map(index => (
        <Card className={clsx(classes.Froot)}>
          <CardHeader title={values[index].name} />
          <CardContent>
            <Grid className={classes.container} container spacing={3}>
              <Grid item md={6} xs={12}>
                <Typography>Opening Time</Typography>
                <TextField
                  fullWidth
                  name="opening_time"
                  type="time"
                  onChange={event =>
                    handleFieldChange(
                      event,
                      values[index].day,
                      'opening_time',
                      event.target.value
                    )
                  }
                  value={values[index].opening_time}
                  variant="outlined"
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <Typography>Closing Time</Typography>
                <TextField
                  fullWidth
                  name="closing_time"
                  type="time"
                  onChange={event =>
                    handleFieldChange(
                      event,
                      values[index].day,
                      'closing_time',
                      event.target.value
                    )
                  }
                  value={values[index].closing_time}
                  variant="outlined"
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox
                      name="is_rest"
                      color="primary"
                      checked={values[index].is_rest}
                      onChange={event =>
                        handleFieldChange(
                          event,
                          values[index].day,
                          'is_rest',
                          event.target.checked
                        )
                      }
                    />
                  }
                  name="is_rest"
                  label="Is Rest?"
                />
              </Grid>

              <Grid item md={6} xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox
                      name="status"
                      color="primary"
                      checked={values[index].status == 'Open'}
                      onChange={event =>
                        handleFieldChange(
                          event,
                          values[index].day,
                          'status',
                          event.target.checked
                        )
                      }
                    />
                  }
                  name="status"
                  label="Is Open?"
                />
              </Grid>
              {values[index].is_rest ? (
                <>
                  <Grid item md={6} xs={12}>
                    <Typography>Start Rest Time</Typography>
                    <TextField
                      fullWidth
                      name="rest_start_time"
                      type="time"
                      onChange={event =>
                        handleFieldChange(
                          event,
                          values[index].day,
                          'rest_start_time'
                        )
                      }
                      value={values[index].rest_start_time}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <Typography>End Rest Time</Typography>
                    <TextField
                      fullWidth
                      name="rest_close_time"
                      type="time"
                      onChange={event =>
                        handleFieldChange(
                          event,
                          values[index].day,
                          'rest_close_time'
                        )
                      }
                      value={values[index].rest_close_time}
                      variant="outlined"
                    />
                  </Grid>
                </>
              ) : (
                ''
              )}
            </Grid>
          </CardContent>
        </Card>
      ))}

      <div className={classes.actions}>
        <Button color="primary" variant="contained" onClick={getForm}>
          Save
        </Button>
      </div>
    </>
  );
};

export default OperatingTimeForm;
