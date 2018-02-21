import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { Map } from 'immutable';

import { Container } from './room.styles';
import { MessageList } from '../../components/MessageList/MessageList.component';
import { MessageBox } from '../../components/MessageBox/MessageBox.component';

export class Room extends PureComponent {
  static propTypes = {
    messages: PropTypes.instanceOf(Map),
    createMessage: PropTypes.func.isRequired,
    setActiveRoomId: PropTypes.func.isRequired,
    match: PropTypes.object.isRequired,
  };

  componentWillMount = () => this.props.setActiveRoomId(this.props.match.params.id);

  render() {
    const { messages, createMessage } = this.props;
    return (
      <Container>
        <Helmet title="Main room" />
        <MessageList messages={messages} />
        <MessageBox onCreateMessage={createMessage} />
      </Container>
    );
  }
}
