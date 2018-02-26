import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Map } from 'immutable';
import moment from 'moment';
import { ListItem, ListItemText } from 'material-ui/List';

import { Author, Data, MessageContent } from './message.styles';
import { UserAvatar } from '../';


export class Message extends PureComponent {
  static propTypes = {
    message: PropTypes.instanceOf(Map),
  };

  get time() {
    const data = moment(this.props.message.get('publicationTime'));

    if (moment().isSame(data, 'd')) {
      return moment(data, 'hmm').format('HH:mm');
    }
    return moment(data, 'hmm').format('HH:mm DD.MM.YYYY');
  }

  get author() { return this.props.message.get('author'); }

  get content() { return this.props.message.get('content'); }

  get primaryText() {
    return (
      <div>
        <Author>{this.author}</Author>
        <Data>{this.time}</Data>
      </div>
    );
  }

  get secondaryText() {
    return (
      <MessageContent>
        {this.content}
      </MessageContent>
    );
  }

  render = () => (
    <ListItem>
      <UserAvatar />
      <ListItemText
        primary={this.primaryText}
        secondary={this.secondaryText}
      />
    </ListItem>
  );
}
