import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { reduxForm, Field } from 'redux-form/immutable';
import { Map } from 'immutable';
import { compose } from 'ramda';
import { TextField } from 'material-ui';

import { MESSAGE_FORM } from '../../modules/rooms/rooms.redux';
import { Wrapper, Form } from './messageBox.styles';


export class MessageBoxForm extends PureComponent {
  static propTypes = {
    message: PropTypes.string,
    onCreateMessage: PropTypes.func.isRequired,
    user: PropTypes.instanceOf(Map),
    handleSubmit: PropTypes.func.isRequired,
    reset: PropTypes.func.isRequired,
  };

  handleSubmit = (values) => new Promise(() => {
    this.props.onCreateMessage(this.props.user.get('uid', null), values.get('message'));
  });

  renderTextField = ({ input, type }) => (
    <TextField
      type={type}
      {...input}
      autoFocus
      fullWidth
    />
  );

  render = () => (
    <Wrapper onClick={this.handleClick}>
      <Form onSubmit={this.props.handleSubmit(this.handleSubmit)}>
        <Field
          component={this.renderTextField}
          name="message"
          type="text"
        />
      </Form>
    </Wrapper>
  );
}

export const MessageBox = compose(
  reduxForm({
    form: MESSAGE_FORM,
  })
)(MessageBoxForm);
