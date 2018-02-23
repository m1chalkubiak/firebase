import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Map } from 'immutable';

import { Wrapper, Content, Loader } from './MessageList.styles';
import { Message } from '../Message/Message.component';


export class MessageList extends PureComponent {
  static propTypes = {
    messages: PropTypes.instanceOf(Map),
  };

  renderList = () => {
    if (this.props.messages.size) {
      const sortedMessages = this.props.messages.sort();

      return sortedMessages.map((message) =>
        <Message message={message.get('value')} key={message.get('_id')} />
      ).toArray();
    }

    return <Loader mode="indeterminate" />;
  };

  render = () => (
    <Wrapper>
      <Content>
        {this.renderList()}
      </Content>
    </Wrapper>
  );
}
