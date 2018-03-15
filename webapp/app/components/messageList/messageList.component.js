import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Map } from 'immutable';
import { Typography } from 'material-ui';
import { FormattedMessage } from 'react-intl';

import { Wrapper, Content, Loader, NoMessages, LoaderWrapper, MessagesWrapper } from './messageList.styles';
import { Message } from '../message/message.component';
import messages from './messageList.messages';


export class MessageList extends PureComponent {
  static propTypes = {
    loaded: PropTypes.bool.isRequired,
    messages: PropTypes.instanceOf(Map),
    users: PropTypes.instanceOf(Map),
  };

  renderMessages = () => (
    <MessagesWrapper innerRef={(ref) => (this.messagesWrapperRef = ref)}>
      {this.props.messages.sort().map((message) =>
        <Message
          user={this.props.users.getIn([message.getIn(['value', 'author']), 'value'], Map())}
          message={message.get('value')} key={message.get('_id')}
        />
      ).toArray()}
    </MessagesWrapper>
  );

  renderNoMessages = () => (
    <NoMessages>
      <Typography>
        <FormattedMessage {...messages.noMessages} />
      </Typography>
    </NoMessages>
  );

  renderLoader = () => (
    <LoaderWrapper>
      <Loader mode="indeterminate" />
    </LoaderWrapper>
  );

  renderList = () => {
    if (!this.props.loaded) {
      return this.renderLoader();
    }

    if (!this.props.messages.size) {
      return this.renderNoMessages();
    }

    return this.renderMessages();
  };

  render = () => (
    <Wrapper>
      <Content>
        {this.renderList()}
      </Content>
    </Wrapper>
  );
}
