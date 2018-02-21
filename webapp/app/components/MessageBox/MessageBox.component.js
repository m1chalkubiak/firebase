import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { Wrapper, Field } from './MessageBox.styles';
import { UserAvatar } from '../UserAvatar/UserAvatar.component';


export class MessageBox extends PureComponent {
  static propTypes = {
    message: PropTypes.string,
    onCreateMessage: PropTypes.func.isRequired,
  };

  state = {
    message: '',
  };

  onChange = (event) => {
    this.setState({
      message: event.target.value,
    });
  };

  onKeyUp = (event) => {
    if (event.keyCode === 13) {
      event.preventDefault();

      this.props.onCreateMessage('Anonim', this.state.message);

      this.setState({
        message: '',
      });
    }
  };

  render() {
    return (
      <Wrapper>
        <UserAvatar />
        <Field
          value={this.state.message}
          onChange={this.onChange}
          onKeyUp={this.onKeyUp}
          multiline
          autoFocus
        />
      </Wrapper>
    );
  }
}
