import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { Map } from 'immutable';

import { Container } from './home.styles';
import { MessageList } from '../../components/MessageList/MessageList.component';
import { MessageBox } from '../../components/MessageBox/MessageBox.component';

export class Home extends PureComponent {
  static propTypes = {
    messages: PropTypes.instanceOf(Map),
    language: PropTypes.string.isRequired,
    createMessage: PropTypes.func.isRequired,
    setActiveAgentId: PropTypes.func.isRequired,
    setLanguage: PropTypes.func.isRequired,
    match: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.shape({
      push: PropTypes.func.isRequired,
    }).isRequired,
  };

  componentWillMount() {
    this.props.setActiveAgentId('main');
  }

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
