import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { reduxForm, Field } from 'redux-form/immutable';
import { compose } from 'ramda';
import { Button, TextField } from 'material-ui';
import Dialog, { DialogContent, DialogContentText, DialogTitle } from 'material-ui/Dialog';
import Slide from 'material-ui/transitions/Slide';

import { CREATE_ROOM_FORM } from '../../modules/rooms/rooms.redux';
import { DialogActionsContainer } from './createRoomDialog.styles';


export class CreateRoomDialogForm extends PureComponent {
  static propTypes = {
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
        {"Want to create a new room?"}
      </DialogTitle>
      <form onSubmit={this.props.handleSubmit(this.handleSubmit)}>
        <DialogContent>
          <DialogContentText>
            Let's give the name of the room You would like to create.
          </DialogContentText>
          <Field
            component={this.renderTextField}
            label="Room name"
            name="name"
            type="text"
          />
        </DialogContent>
        <DialogActionsContainer>
          <Button onClick={this.props.onCloseAction} color="primary">
            Cancel
          </Button>
          <Button type="submit" variant="raised" color="primary">
            Create room
          </Button>
        </DialogActionsContainer>
      </form>
    </Dialog>
  );
}

export const CreateRoomDialog = compose(
  reduxForm({
    form: CREATE_ROOM_FORM,
  })
)(CreateRoomDialogForm);
