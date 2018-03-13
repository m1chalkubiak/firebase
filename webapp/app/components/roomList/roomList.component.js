import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Map } from 'immutable';
import { ifElse, equals, always, lt } from 'ramda';
import { injectIntl, FormattedMessage } from 'react-intl';
import List, { ListItem, ListItemIcon, ListItemText, ListItemSecondaryAction } from 'material-ui/List';
import ListSubheader from 'material-ui/List/ListSubheader';
import IconButton from 'material-ui/IconButton';
import ChatIcon from 'material-ui-icons/Chat';
import ListIcon from 'material-ui-icons/FormatListBulleted';
import AddIcon from 'material-ui-icons/AddBox';

import { RoomLink, RoomListGroup } from './roomList.styles';
import messages from './roomList.messages';


export class RoomListComponent extends PureComponent {
  static propTypes = {
    intl: PropTypes.object.isRequired,
    activeRooms: PropTypes.instanceOf(Map),
    inactiveRooms: PropTypes.instanceOf(Map),
    activeRoom: PropTypes.object.isRequired,
    onOpenCreateRoomDialog: PropTypes.func.isRequired,
  };

  static defaultProps = {
    rooms: Map(),
  };

  isRoomActive = (id) => ifElse(
    equals(this.props.activeRoom.get('id')),
    always({ active: 'active' }),
    always(null)
  )(id);

  renderRoomLabel = () => (
    <ListItem>
      <ListItemIcon>
        <ListIcon />
      </ListItemIcon>
      <ListItemText primary={this.props.intl.formatMessage(messages.roomsListItem)} />
      <ListItemSecondaryAction onClick={this.props.onOpenCreateRoomDialog}>
        <IconButton aria-label={this.props.intl.formatMessage(messages.createRoomActionAriaLabel)}>
          <AddIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );

  renderListItems = (rooms) => rooms
    .sort()
    .map((room) =>
      <RoomLink to={room.get('_id')} key={room.get('_id')} {...this.isRoomActive(room.get('_id'))}>
        <ListItem button>
          <ListItemIcon>
            <ChatIcon />
          </ListItemIcon>
          <ListItemText primary={room.getIn(['value', 'name'])} />
        </ListItem>
      </RoomLink>
    )
    .toArray();

  renderList = (rooms, label) => {
    return ifElse(
      lt(0),
      () => (
        <RoomListGroup>
          <ListSubheader><FormattedMessage {...label} /></ListSubheader>
          {this.renderListItems(rooms)}
        </RoomListGroup>
      ),
      always(null)
    )(rooms.size);
  };


  render = () => (
    <List component="nav">
      {this.renderRoomLabel()}
      {this.renderList(this.props.activeRooms, messages.activeRooms)}
      {this.renderList(this.props.inactiveRooms, messages.inactiveRooms)}
    </List>
  );
}

export const RoomList = injectIntl(RoomListComponent);
