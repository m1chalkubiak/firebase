import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import { hot } from 'react-hot-loader';

import { Room } from './room.component';
import { RoomsActions } from '../../modules/rooms/rooms.redux';
import { selectActiveRoom, selectMessages, selectRoomsList } from '../../modules/rooms/rooms.selectors';

const mapStateToProps = createStructuredSelector({
  activeRoom: selectActiveRoom,
  messages: selectMessages,
  rooms: selectRoomsList,
});

export const mapDispatchToProps = (dispatch) => bindActionCreators({
  setActiveRoomId: RoomsActions.setActiveRoomId,
  createMessage: RoomsActions.createMessage,
}, dispatch);

export default hot(module)(connect(mapStateToProps, mapDispatchToProps)(Room));
