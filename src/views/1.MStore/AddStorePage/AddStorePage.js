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
  Checkbox
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

import { Alert } from 'components';
import { MultiSelect } from 'views/ProjectList/components/Filter/components';
import { Page } from 'components';
import {
  Header,
  StoreDetailForm,
  Preferences,
  DocumentForm,
  ProjectDetails,
  DropzoneComponent
} from './components';
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
  Froot: {},
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
  }
}));

const AddStorePage = () => {
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
  const [resTypeChips, setResTypeChips] = useState([]);
  const [resTagChips, setResTagChips] = useState([]);
  const [areaList, setAreaList] = useState([]);
  const [storeTypeList, setStoreTypeList] = useState([]);

  useEffect(() => {
    getArea();
    getStoreType();
  }, []);

  const getArea = async () => {
    const result = await SettingApi.getAllArea();
    console.log(result);
    const data = Crypto.decryption(result.data.data);
    const parseObject = JSON.parse(data);
    console.log(parseObject);
    setAreaList(parseObject);
  };
  const getStoreType = async () => {
    const result = await SettingApi.getAllStoreType();
    console.log(result);
    const data = Crypto.decryption(result.data.data);
    const parseObject = JSON.parse(data);
    console.log(parseObject);
    console.log('herehre');
    setStoreTypeList(parseObject);
  };

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
    console.log(value);
    if (value) {
      setFiles(files => ({
        ...files,
        [fileType]: value[0]
      }));
    } else {
      setFiles(files => ({
        ...files,
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
    const result = await StoreApi.addStore(payload);
    console.log(result);
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
    <Page className={classes.root} title="Project Create">
      <Header />
      <Card className={clsx(classes.Froot)}>
        <CardHeader title="Store Detail" />
        <CardContent>
          <form>
            <div className={classes.FformGroup}>
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
            {/* <div className={classes.FformGroup}>
              <MultiSelect
                key={RestaurantTypeSelection.label}
                label={RestaurantTypeSelection.label}
                onChange={handleResTypeMultiSelectChange}
                options={RestaurantTypeSelection.options}
                value={resTypeChips}
              />
              <div className={classes.Fchips}>
                {resTypeChips.map(chip => (
                  <Chip
                    className={classes.Fchip}
                    deleteIcon={<CloseIcon />}
                    key={chip}
                    label={chip}
                    onDelete={() => handleResTypeChipDelete(chip)}
                  />
                ))}
              </div>
            </div>
            <div className={classes.FformGroup}>
              <MultiSelect
                key={RestaurantTagSelection.label}
                label={RestaurantTagSelection.label}
                onChange={handleResTagMultiSelectChange}
                options={RestaurantTagSelection.options}
                value={resTagChips}
              />
              <div className={classes.Fchips}>
                {resTagChips.map(chip => (
                  <Chip
                    className={classes.Fchip}
                    deleteIcon={<CloseIcon />}
                    key={chip}
                    label={chip}
                    onDelete={() => handleResTagChipDelete(chip)}
                  />
                ))}
              </div>
            </div> */}
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
      {/* <StoreDetailForm className={classes.aboutProject} /> */}
      {dropzoneList.map(item => {
        return (
          <DropzoneComponent
            title={item.name}
            docAccept={item.docAccept}
            fileType={item.type}
            className={classes.projectCover}
            onUpload={handleFileChange}
          />
        );
      })}

      {/* <ProjectDetails className={classes.projectDetails} /> */}
      {/* <Preferences className={classes.preferences} /> */}
      <div className={classes.actions}>
        <Button color="primary" variant="contained" onClick={getForm}>
          Create Store
        </Button>
      </div>
    </Page>
  );
};

export default AddStorePage;
