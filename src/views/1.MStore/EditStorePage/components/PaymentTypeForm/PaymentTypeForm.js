import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Card,
  CardHeader,
  CardContent,
  TextField,
  InputLabel,
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

const PaymentTypeForm = () => {
  const classes = useStyles();

  const initialValues = {
    name: '',
    phone_number: '',
    description: '',
    store_url: '',
    company_no: '',
    address: '',
    postcode: '',
    latitude: '',
    longitude: '',
    tax_number: '',
    is_veg: 0,
    is_halal: 0,
    area_id: '',
    store_type_id: ''
  };

  const fileValues = {
    logo: '',
    banner: '',
    ssm_document: '',
    letter_authorization: ''
  };

  const [values, setValues] = useState({ ...initialValues });
  const [files, setFiles] = useState({ ...fileValues });
  const [previewFiles, setPreviewFiles] = useState({ ...fileValues });
  const [resTypeChips, setResTypeChips] = useState([]);
  const [resTagChips, setResTagChips] = useState([]);
  const [areaList, setAreaList] = useState([]);
  const [storeTypeList, setStoreTypeList] = useState([]);
  const [tab, setTab] = useState('edit');

  // const handleResTypeChipDelete = chip => {
  //   setResTypeChips(chips => chips.filter(c => chip !== c));
  // };

  // const handleResTypeMultiSelectChange = value => {
  //   setResTypeChips(value);
  // };
  // const handleResTagChipDelete = chip => {
  //   setResTagChips(chips => chips.filter(c => chip !== c));
  // };

  // const handleResTagMultiSelectChange = value => {
  //   setResTagChips(value);
  // };
  const handleFieldChange = (event, field, value) => {
    event.persist && event.persist();
    setValues(values => ({
      ...values,
      [field]: value
    }));
  };

  const handleFileChange = (fileType, value) => {
    console.log('got it');
    console.log(fileType);
    if (value) {
      setFiles(files => ({
        ...files,
        [fileType]: value
      }));
      setPreviewFiles(previewFiles => ({
        ...previewFiles,
        [fileType]: URL.createObjectURL(value)
      }));
    } else {
      setFiles(files => ({
        ...files,
        [fileType]: ''
      }));
      setPreviewFiles(previewFiles => ({
        ...previewFiles,
        [fileType]: ''
      }));
    }
  };

  const RestaurantTypeSelection = {
    label: 'Restaurant Type',
    options: ['Homemade', 'Local', 'A', 'B']
  };
  const RestaurantTagSelection = {
    label: 'Restaurant Tags',
    options: ['Western', 'Japanese', 'Fast Food']
  };

  const getForm = async () => {
    const encryptedData = Crypto.encryption(values);
    const payload = { data: encryptedData, ...files };
    console.log(payload);
    // const result = await StoreApi.addStore(payload);
    // console.log(result);
  };

  const dropzoneList = [
    {
      name: 'Store Picture',
      docAccept: 'image/jpeg, image/png',
      type: 'logo'
    },
    {
      name: 'Store Banner',
      docAccept: 'image/jpeg, image/png',
      type: 'banner'
    },
    { name: 'SSM Document', docAccept: '', type: 'ssm_document' },
    {
      name: 'Letter Authorization',
      docAccept: '',
      type: 'letter_authorization'
    }
  ];
  return (
    <>
      <Card className={clsx(classes.Froot)}>
        <CardHeader title="Order Type" />
        <CardContent>
          <form>
            <div className={classes.FformGroup}>
              <TextField
                fullWidth
                label="Store Name"
                name="name"
                onChange={event => handleFieldChange(event, 'name', event)}
                value={values.name}
                variant="outlined"
              />
            </div>

            <div className={classes.FformGroup}>
              <TextField
                fullWidth
                label="Phone Number"
                name="phone_number"
                onChange={event =>
                  handleFieldChange(event, 'phone_number', event.target.value)
                }
                value={values.phone_number}
                variant="outlined"
              />
            </div>

            <div className={classes.FformGroup}>
              <TextField
                fullWidth
                label="Store Description"
                name="description"
                onChange={event =>
                  handleFieldChange(event, 'description', event.target.value)
                }
                value={values.description}
                variant="outlined"
              />
            </div>

            <div className={classes.FformGroup}>
              <TextField
                fullWidth
                label="Store Url"
                name="store_url"
                onChange={event =>
                  handleFieldChange(event, 'store_url', event.target.value)
                }
                value={values.store_url}
                variant="outlined"
              />
            </div>

            <div className={classes.FformGroup}>
              <TextField
                fullWidth
                label="SSM No."
                name="company_no"
                onChange={event =>
                  handleFieldChange(event, 'company_no', event.target.value)
                }
                value={values.company_no}
                variant="outlined"
              />
            </div>

            <div className={classes.FformGroup}>
              <TextField
                fullWidth
                label="Tax No."
                name="tax_number"
                onChange={event =>
                  handleFieldChange(event, 'tax_number', event.target.value)
                }
                value={values.tax_number}
                variant="outlined"
              />
            </div>

            <div className={classes.FformGroup}>
              <TextField
                fullWidth
                label="Store Address"
                name="address"
                onChange={event =>
                  handleFieldChange(event, 'address', event.target.value)
                }
                value={values.address}
                variant="outlined"
              />
            </div>

            <div className={classes.FformGroup}>
              <TextField
                fullWidth
                label="Post Code"
                name="postcode"
                onChange={event =>
                  handleFieldChange(event, 'postcode', event.target.value)
                }
                value={values.postcode}
                variant="outlined"
              />
            </div>
            <div className={classes.FformGroup}>
              <TextField
                fullWidth
                label="Store Latitude"
                name="latitude"
                onChange={event =>
                  handleFieldChange(event, 'latitude', event.target.value)
                }
                value={values.latitude}
                variant="outlined"
              />
            </div>

            <div className={classes.FformGroup}>
              <TextField
                fullWidth
                label="Store Longitude"
                name="longitude"
                onChange={event =>
                  handleFieldChange(event, 'longitude', event.target.value)
                }
                value={values.longitude}
                variant="outlined"
              />
            </div>
            <div variant="outlined" className={classes.FformGroup}>
              <Typography>Area</Typography>
              <TextField
                fullWidth
                name="Area"
                onChange={event =>
                  handleFieldChange(event, 'area_id', event.target.value)
                }
                select
                selected={areaList[0]}
                // eslint-disable-next-line react/jsx-sort-props
                SelectProps={{ native: true }}
                value={values.area_id}
                variant="outlined">
                {areaList.map(area => (
                  <option key={area.id} value={area.id}>
                    {area.name}
                  </option>
                ))}
              </TextField>
            </div>
            <div variant="outlined" className={classes.FformGroup}>
              <Typography>Store Type</Typography>
              <TextField
                fullWidth
                name="Store Type"
                onChange={event =>
                  handleFieldChange(event, 'store_type_id', event.target.value)
                }
                select
                // eslint-disable-next-line react/jsx-sort-props
                SelectProps={{ native: true }}
                value={values.store_type_id}
                variant="outlined">
                {storeTypeList.map(storeType => (
                  <option key={storeType.id} value={storeType.id}>
                    {storeType.name}
                  </option>
                ))}
              </TextField>
            </div>
            <div variant="outlined" className={classes.FformGroup}>
              <Typography>Logo</Typography>
              <input
                type="file"
                onChange={event =>
                  handleFileChange('logo', event.target.files[0])
                }
              />
              {previewFiles.logo && (
                <img className={classes.image} src={previewFiles.logo} />
              )}
            </div>
            <div variant="outlined" className={classes.FformGroup}>
              <Typography>Banner</Typography>
              <input
                type="file"
                onChange={event =>
                  handleFileChange('banner', event.target.files[0])
                }
              />
              {previewFiles.banner && (
                <img className={classes.image} src={previewFiles.banner} />
              )}
            </div>
            <div variant="outlined" className={classes.FformGroup}>
              <Typography>SSM Document</Typography>
              <input
                type="file"
                onChange={event =>
                  handleFileChange('ssm_document', event.target.files[0])
                }
              />

              {previewFiles.ssm_document && (
                <Link
                  href={previewFiles.ssm_document}
                  target="_blank"
                  rel="noreferrer">
                  Download Now
                </Link>
              )}
            </div>
            <div variant="outlined" className={classes.FformGroup}>
              <Typography>Letter Authorization</Typography>
              <input
                type="file"
                onChange={event =>
                  handleFileChange(
                    'letter_authorization',
                    event.target.files[0]
                  )
                }
              />

              {previewFiles.letter_authorization && (
                <Link
                  href={previewFiles.letter_authorization}
                  target="_blank"
                  rel="noreferrer">
                  Download Now
                </Link>
              )}
            </div>

            <div variant="outlined" className={classes.FformGroup}>
              <FormControlLabel
                control={<Checkbox color="primary" value={values.is_halal} />}
                label="Is halal?"
              />
            </div>

            <div variant="outlined" className={classes.FformGroup}>
              <FormControlLabel
                control={<Checkbox color="primary" value={values.is_veg} />}
                label="Is Veg?"
              />
            </div>
          </form>
        </CardContent>
      </Card>
      <div className={classes.actions}>
        <Button color="primary" variant="contained" onClick={getForm}>
          Save
        </Button>
      </div>
    </>
  );
};

export default PaymentTypeForm;
