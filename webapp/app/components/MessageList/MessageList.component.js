import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Map } from 'immutable';
import { Wrapper, Loader } from './MessageList.styles';

import { Message } from '../Message/Message.component';


export class MessageList extends PureComponent {
  static propTypes = {
    messages: PropTypes.instanceOf(Map),
  };

  renderList = () => {
    if (this.props.messages.size) {
      return this.props.messages.toArray().map((message) =>
        <Message message={message.get('value')} key={message.get('_id')} />
      );
    }
    return (
      <Loader mode="indeterminate" />
    );
  };

  render = () => (
    <Wrapper>
      {this.renderList()}
    </Wrapper>
  );
}
