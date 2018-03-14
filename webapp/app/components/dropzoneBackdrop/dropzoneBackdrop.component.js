import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Fade from 'material-ui/transitions/Fade';
import Typography from 'material-ui/Typography';
import AddToPhotosIcon from 'material-ui-icons/AddToPhotos';

import { Backdrop } from './dropzoneBackdrop.styles';


export class DropzoneBackdrop extends PureComponent {
  static propTypes = {
    open: PropTypes.bool.isRequired,
  };

  render = () => (
    <Fade appear in={this.props.open}>
      <Backdrop>
        <AddToPhotosIcon />&nbsp;
        <Typography variant="title" color="inherit">
          Drop file here
        </Typography>
      </Backdrop>
    </Fade>
  );
}
