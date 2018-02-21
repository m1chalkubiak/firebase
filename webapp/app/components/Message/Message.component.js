import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { ListItem, ListItemText } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';

export class Message extends PureComponent {
  static propTypes = {
    message: PropTypes.string,
  };

  render() {
    const { message } = this.props;

    return (
      <ListItem>
        <Avatar>{'AN'}</ Avatar>
        {/*<span style={styles.date}>{new Date(message.date).toLocaleString().slice(10)}</span>*/}
        {/*<span style={styles.author}>{message.author}</span>: {message.message}*/}
        <ListItemText primary={'Anonim'} secondary={message} />
      </ListItem>
    );
  }
}
