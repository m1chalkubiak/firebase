import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Map } from 'immutable';
import moment from 'moment';
import { ListItem, ListItemText } from 'material-ui/List';
import { ifElse } from 'ramda';
import { withStyles } from 'material-ui/styles';

import styles, { Author, Data, MessageContent, MessageImage } from './message.styles';
import { UserAvatar } from '../userAvatar/userAvatar.component';


export class MessageComponent extends PureComponent {
  static propTypes = {
    user: PropTypes.instanceOf(Map),
    classes: PropTypes.object.isRequired,
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
    <ListItem className={this.props.classes.listItem}>
      <UserAvatar user={this.user} />
      <ListItemText
        primary={this.renderPrimary()}
        secondary={this.renderSecondary(this.props)}
      />
    </ListItem>
  );
}

export const Message = withStyles(styles)(MessageComponent);
