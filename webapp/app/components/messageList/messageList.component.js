import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Map } from 'immutable';
import { Typography } from 'material-ui';
import { FormattedMessage } from 'react-intl';

import { Wrapper, Content, Loader, NoMessages, LoaderWrapper } from './messageList.styles';
import { Message } from '../';
import messages from './messageList.messages';


export class MessageList extends PureComponent {
  static propTypes = {
    loaded: PropTypes.bool.isRequired,
    messages: PropTypes.instanceOf(Map),
  };

  renderMessages = () => this.props.messages.sort().map((message) =>
    <Message message={message.get('value')} key={message.get('_id')} />
  ).toArray();

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
    if (this.props.loaded) {
      if (this.props.messages.size) {
        return this.renderMessages();
      }
      return this.renderNoMessages();
    }
    return this.renderLoader();
  };

  render = () => (
    <Wrapper>
      <Content>
        {this.renderList()}
      </Content>
    </Wrapper>
  );
}
