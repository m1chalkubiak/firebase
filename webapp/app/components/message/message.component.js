import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Map } from 'immutable';
import moment from 'moment';
import { ListItem, ListItemText } from 'material-ui/List';

import { Author, Data, MessageContent } from './message.styles';
import { UserAvatar } from '../userAvatar/userAvatar.component';


export class Message extends PureComponent {
  static propTypes = {
    users: PropTypes.instanceOf(Map),
    message: PropTypes.instanceOf(Map),
  };

  get time() {
    const data = moment(this.props.message.get('publicationTime'));

    if (moment().isSame(data, 'd')) {
      return moment(data, 'hmm').format('HH:mm');
    }
    return moment(data, 'hmm').format('HH:mm DD.MM.YYYY');
  }

  get user() { return this.props.users.getIn([`${this.props.message.get('author')}`, 'value'], Map()); }

  renderPrimaryText = () => (
    <div>
      <Author>{this.user.get('displayName', '')}</Author>
      <Data>{this.time}</Data>
    </div>
  );

  renderSecondaryText = () => (
    <MessageContent>
      {this.props.message.get('content', '')}
    </MessageContent>
  );

  render = () => (
    <ListItem>
      <UserAvatar user={this.user} />
      <ListItemText
        primary={this.renderPrimaryText()}
        secondary={this.renderSecondaryText()}
      />
    </ListItem>
  );
}
