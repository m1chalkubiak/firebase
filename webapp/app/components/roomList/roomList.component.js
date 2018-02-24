import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Map } from 'immutable';
import { when, equals, always } from 'ramda';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import ChatIcon from 'material-ui-icons/Chat';

import { RoomLink } from './roomList.styles';


export class RoomList extends PureComponent {
  static propTypes = {
    rooms: PropTypes.instanceOf(Map),
    activeRoom: PropTypes.object.isRequired,
  };

  static defaultProps = {
    rooms: Map(),
  };

  renderList = () => {
    const isActive = (id) => when(
      equals(this.props.activeRoom.get('id')),
      always({ active: 'active' }),
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
      {this.renderList()}
    </List>
  );
}
