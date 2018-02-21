import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { Map } from 'immutable';

import { Container } from './home.styles';
import { MessageList } from '../../components/MessageList/MessageList.component';
import { MessageBox } from '../../components/MessageBox/MessageBox.component';

export class Home extends PureComponent {
  static propTypes = {
    items: PropTypes.object,
    messages: PropTypes.instanceOf(Map),
    language: PropTypes.string.isRequired,
    fetchMaintainers: PropTypes.func.isRequired,
    setActiveAgentId: PropTypes.func.isRequired,
    setLanguage: PropTypes.func.isRequired,
    match: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.shape({
      push: PropTypes.func.isRequired,
    }).isRequired,
  };

  componentWillMount() {
    this.props.fetchMaintainers(this.props.language);
    this.props.setActiveAgentId('main');
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.language !== this.props.language) {
      this.props.fetchMaintainers(nextProps.language);
    }
  }

  render() {
    const { messages } = this.props;
    return (
      <Container>
        <Helmet title="Homepage" />
        <MessageList messages={messages} />
        <MessageBox />
      </Container>
    );
  }
}
