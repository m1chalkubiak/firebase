import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { reduxForm, Field } from 'redux-form/immutable';
import { compose } from 'ramda';
import { Button, TextField } from 'material-ui';
import Dialog, { DialogContent, DialogContentText, DialogTitle } from 'material-ui/Dialog';
import Slide from 'material-ui/transitions/Slide';
import { FormattedMessage, injectIntl } from 'react-intl';

import { CREATE_ROOM_FORM } from '../../modules/rooms/rooms.redux';
import { DialogActionsContainer } from './createRoomDialog.styles';
import messages from './createRoomDialog.messages';


export class CreateRoomDialogForm extends PureComponent {
  static propTypes = {
    intl: PropTypes.object.isRequired,
    opened: PropTypes.bool.isRequired,
    onCloseAction: PropTypes.func.isRequired,
    onCreateRoom: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    reset: PropTypes.func.isRequired,
  };

  transition = (props) => (
    <Slide direction="up" {...props} />
  );

  handleSubmit = (values) => new Promise(() => this.props.onCreateRoom(values.get('name')));

  renderTextField = ({ input, type, label }) => (
    <TextField
      type={type}
      label={label}
      {...input}
      autoFocus
      fullWidth
    />
  );

  render = () => (
    <Dialog
      open={this.props.opened}
      transition={this.transition}
      keepMounted
      onClose={this.props.onCloseAction}
    >
      <DialogTitle>
        <FormattedMessage {...messages.dialogTitle} />
      </DialogTitle>
      <form onSubmit={this.props.handleSubmit(this.handleSubmit)}>
        <DialogContent>
          <DialogContentText>
            <FormattedMessage {...messages.dialogContentText} />
          </DialogContentText>
          <Field
            component={this.renderTextField}
            label={this.props.intl.formatMessage(messages.fieldLabel)}
            name="name"
            type="text"
          />
        </DialogContent>
        <DialogActionsContainer>
          <Button onClick={this.props.onCloseAction} color="primary">
            <FormattedMessage {...messages.cancelButton} />
          </Button>
          <Button type="submit" variant="raised" color="primary">
            <FormattedMessage {...messages.createRoomButton} />
          </Button>
        </DialogActionsContainer>
      </form>
    </Dialog>
  );
}

export const CreateRoomDialog = compose(
  injectIntl,
  reduxForm({
    form: CREATE_ROOM_FORM,
  })
)(CreateRoomDialogForm);
