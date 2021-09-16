import React, { Fragment, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { useDropzone } from 'react-dropzone';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { makeStyles } from '@material-ui/styles';
import {
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

const useStyles = makeStyles(theme => ({
  root: {},
  dropZone: {
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
  dragActive: {
    backgroundColor: colors.grey[50],
    opacity: 0.5
  },
  image: {
    width: 130
  },
  info: {
    marginTop: theme.spacing(1)
  },
  list: {
    maxHeight: 320
  },
  actions: {
    marginTop: theme.spacing(2),
    display: 'flex',
    justifyContent: 'flex-end',
    '& > * + *': {
      marginLeft: theme.spacing(2)
    }
  }
}));

const FilesDropzone = props => {
  const { className, ...rest } = props;

  const classes = useStyles();

  const [files, setFiles] = useState();

  const handleDrop = useCallback(acceptedFiles => {
    setFiles(acceptedFiles);
  }, []);

  const handleRemoveAll = () => {
    setFiles();
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: handleDrop,
    accept: 'image/jpeg, image/png',
  });

  return (
    <div {...rest} className={clsx(classes.root, className)}>
      {!files ? (
        <div
          className={clsx({
            [classes.dropZone]: true,
            [classes.dragActive]: isDragActive
          })}
          {...getRootProps()}>
          <input {...getInputProps()} />
          <div>
            <img
              alt="Select file"
              className={classes.image}
              src="/images/undraw_add_file2_gvbb.svg"
            />
          </div>
          <div>
            <Typography gutterBottom variant="h3">
              Select files
            </Typography>
            <Typography
              className={classes.info}
              color="textSecondary"
              variant="body1">
              Drop files here or click <Link underline="always">browse</Link>{' '}
              thorough your machine
            </Typography>
          </div>
        </div>
      ) : (
        <Fragment>
          <PerfectScrollbar options={{ suppressScrollX: true }}>
            <List className={classes.list}>
              <ListItem>
                <ListItemIcon>
                  <FileCopyIcon />
                </ListItemIcon>
                <ListItemText
                  primary={files.name}
                  primaryTypographyProps={{ variant: 'h5' }}
                  secondary={bytesToSize(files.size)}
                />
                <Tooltip title="More options">
                  <IconButton edge="end">
                    <CloseIcon onClick={handleRemoveAll} />
                  </IconButton>
                </Tooltip>
              </ListItem>
            </List>
          </PerfectScrollbar>
        </Fragment>
      )}
    </div>
  );
};

FilesDropzone.propTypes = {
  className: PropTypes.string
};

export default FilesDropzone;
