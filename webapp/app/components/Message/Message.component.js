import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Map } from 'immutable';
import moment from 'moment';
import { ListItem, ListItemText } from 'material-ui/List';

import { Author, Data, MessageContent } from './Message.styles';
import { UserAvatar } from '../UserAvatar/UserAvatar.component';


export class Message extends PureComponent {
  static propTypes = {
    message: PropTypes.instanceOf(Map),
  };

  get data() {
    const data = moment(this.props.message.get('publicationTime'));

    if (moment().isSame(data, 'd')) {
      return moment(data, 'hmm').format('HH:mm');
    }
    return moment(data, 'hmm').format('HH:mm DD.MM.YYYY');
  }

  get primaryText() {
    return (
      <div>
        <Author>{this.props.message.get('author')}</Author>
        <Data>{this.data}</Data>
      </div>
    );
  }

  get secondaryText() {
    return (
      <MessageContent>
        {this.props.message.get('content')}
      </MessageContent>
    );
  }

  render() {
    return (
      <ListItem>
        <UserAvatar />
        <ListItemText
          primary={this.primaryText}
          secondary={this.secondaryText}
        />
      </ListItem>
    );
  }
}
