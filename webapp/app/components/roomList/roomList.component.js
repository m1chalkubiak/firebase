import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Map } from 'immutable';
import { ifElse, equals, always } from 'ramda';
import List, { ListItem, ListItemIcon, ListItemText, ListItemSecondaryAction } from 'material-ui/List';
import IconButton from 'material-ui/IconButton';
import ChatIcon from 'material-ui-icons/Chat';
import ListIcon from 'material-ui-icons/FormatListBulleted';
import AddIcon from 'material-ui-icons/AddBox';

import { RoomLink } from './roomList.styles';


export class RoomList extends PureComponent {
  static propTypes = {
    rooms: PropTypes.instanceOf(Map),
    activeRoom: PropTypes.object.isRequired,
    onOpenCreateRoomDialog: PropTypes.func.isRequired,
  };

  static defaultProps = {
    rooms: Map(),
  };

  renderRoomLabel = () => (
    <ListItem>
      <ListItemIcon>
        <ListIcon />
      </ListItemIcon>
      <ListItemText primary={'Rooms'} />
      <ListItemSecondaryAction onClick={this.props.onOpenCreateRoomDialog}>
        <IconButton aria-label="Create">
          <AddIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );

  renderList = () => {
    const isActive = (id) => ifElse(
      equals(this.props.activeRoom.get('id')),
      always({ active: 'active' }),
      always(null)
    )(id);

    return this.props.rooms.sort().map((room) =>
      <RoomLink to={room.get('_id')} key={room.get('_id')} {...isActive(room.get('_id'))}>
        <ListItem button>
          <ListItemIcon>
            <ChatIcon />
          </ListItemIcon>
          <ListItemText primary={room.getIn(['value', 'name'])} />
        </ListItem>
      </RoomLink>
    ).toArray();
  };

  render = () => (
    <List component="nav">
      {this.renderRoomLabel()}
      {this.renderList()}
    </List>
  );
}
