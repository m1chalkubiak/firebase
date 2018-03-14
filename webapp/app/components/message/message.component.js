import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Map } from 'immutable';
import moment from 'moment';
import { ListItem, ListItemText } from 'material-ui/List';
import { ifElse } from 'ramda';

import { Author, Data, MessageContent, MessageImage } from './message.styles';
import { UserAvatar } from '../userAvatar/userAvatar.component';


export class Message extends PureComponent {
  static propTypes = {
    user: PropTypes.instanceOf(Map),
    message: PropTypes.instanceOf(Map),
  };

  get time() {
    const data = moment(this.props.message.get('publicationTime'));

    if (moment().isSame(data, 'd')) {
      return moment(data, 'hmm').format('HH:mm');
    }
    return moment(data, 'hmm').format('HH:mm DD.MM.YYYY');
  }

  get user() { return this.props.user; }

  renderPrimary = () => (
    <div>
      <Author>{this.user.get('displayName', '')}</Author>
      <Data>{this.time}</Data>
    </div>
  );

  renderSecondary = ifElse(
    ({ message }) => message.has('image'),
    ({ message }) => <MessageImage src={message.get('image')} />,
    ({ message }) => <MessageContent>{message.get('content', '')}</MessageContent>,
  );

  render = () => (
    <ListItem>
      <UserAvatar user={this.user} />
      <ListItemText
        primary={this.renderPrimary()}
        secondary={this.renderSecondary(this.props)}
      />
    </ListItem>
  );
}
