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
import { CheckBoxOutlineBlank } from '@material-ui/icons';

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

const PaymentTypeForm = ({paymentSetting}) => {
  console.log(paymentSetting)
  const classes = useStyles();

  const initialValues = {
    cash_active:0,
    eWalletM_active:0,
    online_active:0,
    fpx_active:0,
    eWallet_active: 0,
    bank_name_id:'',
    bank_account:'',
    bank_account_number:''
  };

  const fileValues = {
    e_wallet_image:''
  };

  const [values, setValues] = useState({ ...initialValues });
  const [files, setFiles] = useState({ ...fileValues });
  const [previewFiles, setPreviewFiles] = useState({ ...fileValues });
  const [resTypeChips, setResTypeChips] = useState([]);
  const [resTagChips, setResTagChips] = useState([]);
  // const [areaList, setAreaList] = useState([]);
  const [bankList, setBankList] = useState([]);
  // const [storeTypeList, setStoreTypeList] = useState([]);
  const [tab, setTab] = useState('edit');

  useEffect(() => {
    getBank();
    checkInfo();
  }, []);

  const getBank = async () => {
    const result = await StoreApi.getBank();
    if (result.status === 200) {
      const data = Crypto.decryption(result.data.data);
      const parseObject = JSON.parse(data);
      setBankList(parseObject);
    }
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
    console.log(values);
    // const encryptedData = Crypto.encryption(values);
    // const payload = { data: encryptedData, ...files };
    // console.log(payload);
    // const result = await StoreApi.addStore(payload);
    // console.log(result);
  };

  const dropzoneList = [
    {
      name: 'Wallet Picture',
      docAccept: 'image/jpeg, image/png',
      type: 'e_wallet_image'
    }
  ];
  return (
    <>
      <Card className={clsx(classes.Froot)}>
        <CardHeader title="Payment Type" />
        <CardContent>
          <form>

          <div variant="outlined" className={classes.FformGroup}>
              <Typography>Bank Name</Typography>
              <TextField
                fullWidth
                name="Bank"
                onChange={event =>
                  handleFieldChange(event, 'bank_name_id', event.target.value)
                }
                select
                selected={bankList[0]}
                // eslint-disable-next-line react/jsx-sort-props
                SelectProps={{ native: true }}
                value={values.bank_name_id}
                variant="outlined">
                {bankList.map(bank => (
                  <option key={bank.id} value={bank.id}>
                    {bank.name}
                  </option>
                ))}
              </TextField>
            </div>
          
            <div className={classes.FformGroup}>
              <TextField
                fullWidth
                label="Bank Account"
                name="bank_account"
                onChange={event =>
                  handleFieldChange(event, 'bank_account', event.target.value)
                }
                value={values.bank_account}
                variant="outlined"
              />
            </div>

            <div className={classes.FformGroup}>
              <TextField
                fullWidth
                label="Bank Account Number"
                name="bank_account_number"
                onChange={event =>
                  handleFieldChange(event, 'bank_account_number', event.target.value)
                }
                value={values.bank_account_number}
                variant="outlined"
              />
            </div>

            <div variant="outlined" className={classes.FformGroup}>
              <Typography>E-wallet image</Typography>
              <input
                type="file"
                onChange={event =>
                  handleFileChange('e_wallet_image', event.target.files[0])
                }
              />
              {previewFiles.e_wallet_image && (
                <img className={classes.image} src={previewFiles.e_wallet_image} />
              )}
            </div>
            <div variant="outlined" className={classes.FformGroup}>
              <FormControlLabel 
                control={<Checkbox color="primary" value={values.cash_active} 
                onChange={event =>
                  handleFieldChange(
                    event,
                    'cash_active',
                    event.target.checked
                  )
                }/>}
                label="Cash is active?"
              />
            </div>
            <div variant="outlined" className={classes.FformGroup}>
              <FormControlLabel 
                control={<Checkbox color="primary" value={values.eWalletM_active} 
                onChange={event =>
                  handleFieldChange(
                    event,
                    'eWalletM_active',
                    event.target.checked
                  )
                }/>}
                label="E Wallet (manual) is active?"
              />
            </div>
            <div variant="outlined" className={classes.FformGroup}>
              <FormControlLabel 
                control={<Checkbox color="primary" value={values.online_active} 
                onChange={event =>
                  handleFieldChange(
                    event,
                    'online_active',
                    event.target.checked
                  )
                }/>}
                label="online is active?"
              />
            </div>
            <div variant="outlined" className={classes.FformGroup}>
              <FormControlLabel 
                control={<Checkbox color="primary" value={values.fpx_active} 
                onChange={event =>
                  handleFieldChange(
                    event,
                    'fpx_active',
                    event.target.checked
                  )
                }/>}
                label="FPX is active?"
              />
            </div>
            <div variant="outlined" className={classes.FformGroup}>
              <FormControlLabel 
                control={<Checkbox color="primary" value={values.eWallet_active} 
                onChange={event =>
                  handleFieldChange(
                    event,
                    'eWallet_active',
                    event.target.checked
                  )
                }/>}
                label="E wallet is active?"
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
