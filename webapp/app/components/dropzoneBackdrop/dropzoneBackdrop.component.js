import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Fade from 'material-ui/transitions/Fade';
import Typography from 'material-ui/Typography';
import AddToPhotosIcon from 'material-ui-icons/AddToPhotos';
import { FormattedMessage } from 'react-intl';

import { Backdrop } from './dropzoneBackdrop.styles';
import messages from './dropzoneBackdrop.messages';


export class DropzoneBackdrop extends PureComponent {
  static propTypes = {
    open: PropTypes.bool.isRequired,
  };

  render = () => (
    <Fade appear in={this.props.open}>
      <Backdrop>
        <AddToPhotosIcon />&nbsp;
        <Typography variant="title" color="inherit">
          <FormattedMessage {...messages.dropHere} />
        </Typography>
      </Backdrop>
    </Fade>
  );
}
