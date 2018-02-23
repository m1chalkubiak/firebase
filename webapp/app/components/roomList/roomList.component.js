import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Map } from 'immutable';
import { ifElse, equals, always } from 'ramda';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import ChatIcon from 'material-ui-icons/Chat';

import { RoomLink } from './roomList.styles';


export class RoomList extends PureComponent {
  static propTypes = {
    rooms: PropTypes.instanceOf(Map),
    activeRoom: PropTypes.object.isRequired,
  };

  renderList = () => {
    if (this.props.rooms.size) {
      const sortedRooms = this.props.rooms.sort();
      const isActive = (id) => ifElse(
        equals(this.props.activeRoom.get('id')),
        always({ active: 'active' }),
        always(null)
      )(id);

      return sortedRooms.map((room) =>
        <RoomLink to={room.get('_id')} key={room.get('_id')} {...isActive(room.get('_id'))}>
          <ListItem button>
            <ListItemIcon>
              <ChatIcon />
            </ListItemIcon>
            <ListItemText primary={room.getIn(['value', 'name'])} />
          </ListItem>
        </RoomLink>
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
