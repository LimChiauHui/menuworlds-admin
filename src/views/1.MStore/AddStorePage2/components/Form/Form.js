import React, { useRef, useState } from 'react';
import {
  Modal,
  Card,
  CardContent,
  CardActions,
  Grid,
  Typography,
  TextField,
  Switch,
  Button,
  colors,
  IconButton,
  Tooltip
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import AddPhotoIcon from '@material-ui/icons/AddPhotoAlternate';

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: theme.spacing(2)
  },
  container: {
    marginTop: theme.spacing(1)
  },
  actions: {
    justifyContent: 'flex-end'
  },
  sendButton: {
    marginRight: theme.spacing(2)
  },
  saveButton: {
    color: theme.palette.white,
    backgroundColor: colors.green[600],
    '&:hover': {
      backgroundColor: colors.green[900]
    }
  },
  fileInput: {
    display: 'none'
  }
}));

const Form = () => {
  const classes = useStyles();
  const [formState, setFormState] = useState({
    email: 'abc',
    name: 'bbc',
    phone: '123',
    address: 'taman u'
  });

  const fileInputRef = useRef(null);
  const handleFieldChange = event => {
    // event.persist();
    // setFormState(formState => ({
    //   ...formState,
    //   [event.target.name]:
    //     event.target.type === 'checkbox'
    //       ? event.target.checked
    //       : event.target.value
    // }));
  };
  const handleAttach = () => {
    fileInputRef.current.click();
  };

  return (
    <Card className={classes.root}>
      <form>
        <CardContent>
          <Grid className={classes.container} container spacing={3}>
            <Grid item md={12} xs={12}>
              <TextField
                fullWidth
                label="Email address"
                name="email"
                onChange={handleFieldChange}
                value={formState.email}
                variant="outlined"
              />
            </Grid>
            <Grid item md={12} xs={12}>
              <TextField
                fullWidth
                label="Full name"
                name="name"
                onChange={handleFieldChange}
                value={formState.name}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Phone number"
                name="phone"
                onChange={handleFieldChange}
                value={formState.phone}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Address"
                name="address"
                onChange={handleFieldChange}
                value={formState.address}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <Typography variant="h5">Is Recommended</Typography>
              <Switch
                checked={formState.is_recommended}
                color="secondary"
                edge="start"
                name="discountedPrices"
                onChange={handleFieldChange}
                value={formState.discountedPrices}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <Typography variant="h5">Is New</Typography>
              <Switch
                checked={formState.is_recommended}
                color="secondary"
                edge="start"
                name="discountedPrices"
                onChange={handleFieldChange}
                value={formState.discountedPrices}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <Typography variant="h5">Is Popular</Typography>
              <Switch
                checked={formState.is_recommended}
                color="secondary"
                edge="start"
                name="discountedPrices"
                onChange={handleFieldChange}
                value={formState.discountedPrices}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <Typography variant="h5">Is Charity</Typography>
              <Switch
                checked={formState.is_recommended}
                color="secondary"
                edge="start"
                name="discountedPrices"
                onChange={handleFieldChange}
                value={formState.discountedPrices}
              />
            </Grid>
          </Grid>
          <Grid item md={12} xs={12}>
            <Typography variant="h5">SSM Doc</Typography>
            <Tooltip title="Attach image">
              <IconButton onClick={handleAttach}>
                <AddPhotoIcon />
              </IconButton>
            </Tooltip>
            <input
              className={classes.fileInput}
              ref={fileInputRef}
              type="file"
            />
          </Grid>
        </CardContent>
        <CardActions className={classes.actions}>
          <Button className={classes.saveButton} variant="contained">
            Save
          </Button>
        </CardActions>
      </form>
    </Card>
  );
};

export default Form;


