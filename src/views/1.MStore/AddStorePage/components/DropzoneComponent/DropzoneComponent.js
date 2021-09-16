import React, { Fragment, useState, useCallback } from 'react';
import { makeStyles } from '@material-ui/styles';
import clsx from 'clsx';
import { useDropzone } from 'react-dropzone';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Card,
  CardHeader,
  CardContent,
  IconButton,
  Link,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  Tooltip,
  colors
} from '@material-ui/core';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import CloseIcon from '@material-ui/icons/Close';

import bytesToSize from 'utils/bytesToSize';
import moment from 'moment';
import AddIcon from '@material-ui/icons/Add';
import { Alert } from 'components';

const useStyles = makeStyles(theme => ({
  DdropZone: {
    border: `1px dashed ${theme.palette.divider}`,
    padding: theme.spacing(6),
    outline: 'none',
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    alignItems: 'center',
    '&:hover': {
      backgroundColor: colors.grey[50],
      opacity: 0.5,
      cursor: 'pointer'
    }
  },
  DdragActive: {
    backgroundColor: colors.grey[50],
    opacity: 0.5
  },
  Dimage: {
    width: 130
  },
  Dinfo: {
    marginTop: theme.spacing(1)
  },
  Dlist: {
    maxHeight: 320
  },
  Dactions: {
    marginTop: theme.spacing(2),
    display: 'flex',
    justifyContent: 'flex-end',
    '& > * + *': {
      marginLeft: theme.spacing(2)
    }
  }
}));

const DropzoneComponent = props => {
  const { title, docAccept, fileType, onUpload } = props;
  const classes = useStyles();
  const [files, setFiles] = useState();

  const handleDrop = useCallback(acceptedFiles => {
    setFiles(acceptedFiles);
    console.log(acceptedFiles);
    onUpload(fileType, acceptedFiles);
  }, []);

  const handleRemoveAll = () => {
    setFiles();
    onUpload(fileType, '');
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: handleDrop,
    accept: docAccept,
    multiple: false
  });
  return (
    <Card>
      <CardHeader title={title} />
      <CardContent>
        <div>
          {!files ? (
            <div
              className={clsx({
                [classes.DdropZone]: true,
                [classes.DdragActive]: isDragActive
              })}
              {...getRootProps()}>
              <input {...getInputProps()} />
              <div>
                <img
                  alt="Select file"
                  className={classes.Dimage}
                  src="/images/undraw_add_file2_gvbb.svg"
                />
              </div>
              <div>
                <Typography gutterBottom variant="h3">
                  Select files
                </Typography>
                <Typography
                  className={classes.Dinfo}
                  color="textSecondary"
                  variant="body1">
                  Drop files here or click{' '}
                  <Link underline="always">browse</Link> thorough your machine
                </Typography>
              </div>
            </div>
          ) : (
            <Fragment>
              <PerfectScrollbar options={{ suppressScrollX: true }}>
                <List className={classes.Dlist}>
                  <ListItem>
                    <ListItemIcon>
                      <FileCopyIcon />
                    </ListItemIcon>
                    <ListItemText
                      primary={files[0].name}
                      primaryTypographyProps={{ variant: 'h5' }}
                      secondary={bytesToSize(files[0].size)}
                    />
                    <Tooltip title="Remove">
                      <IconButton edge="end" onClick={handleRemoveAll}>
                        <CloseIcon />
                      </IconButton>
                    </Tooltip>
                  </ListItem>
                </List>
              </PerfectScrollbar>
            </Fragment>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default DropzoneComponent;
