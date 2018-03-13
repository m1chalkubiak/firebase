import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Map } from 'immutable';
import { ifElse, always, gt } from 'ramda';
import { injectIntl } from 'react-intl';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import PeopleIcon from 'material-ui-icons/People';

import { UserAvatar } from '../userAvatar/userAvatar.component';
import messages from './usersList.messages';
import { UserItem } from './usersList.styles';


export class UsersListComponent extends PureComponent {
  static propTypes = {
    intl: PropTypes.object.isRequired,
    users: PropTypes.instanceOf(Map),
  };

  static defaultProps = {
    users: Map(),
  };

  renderRoomLabel = () => (
    <ListItem>
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
      <ListItemText primary={this.props.intl.formatMessage(messages.listLabel)} />
    </ListItem>
  );

  renderList = () => this.props.users.sort().map((user) =>
    <UserItem key={user.get('_id')} >
      <UserAvatar user={user.get('value')} small />
      <ListItemText primary={user.getIn(['value', 'displayName'])} />
    </UserItem>
  ).toArray();

  render = () => ifElse(
    gt(0),
    always(
      <List component="nav">
        {this.renderRoomLabel()}
        {this.renderList()}
      </List>
    ),
    always(null),
  )(this.props.users.size);
}

export const UsersList = injectIntl(UsersListComponent);
