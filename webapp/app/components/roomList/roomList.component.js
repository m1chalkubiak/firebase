import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Map } from 'immutable';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import ChatIcon from 'material-ui-icons/Chat';


export class RoomList extends PureComponent {
  static propTypes = {
    rooms: PropTypes.instanceOf(Map),
  };

  renderList = () => {
    if (this.props.rooms.size) {
      const sortedRooms = this.props.rooms.sort();

      return sortedRooms.map((room) =>
        <ListItem button key={room.get('_id')} >
          <ListItemIcon>
            <ChatIcon />
          </ListItemIcon>
          <ListItemText primary={room.getIn(['value', 'name'])} />
        </ListItem>
      ).toArray();
    }

    return null;
  };

  render = () => (
    <List component="nav">
      {this.renderList()}
    </List>
  );
}
