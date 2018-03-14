import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import { hot } from 'react-hot-loader';
import { withStyles } from 'material-ui/styles';
import { compose } from 'ramda';

import { Room } from './room.component';
import styles from './room.styles';
import { RoomsActions } from '../../modules/rooms/rooms.redux';
import {
  selectActiveRoom, selectMessages, selectActiveRoomsList, selectInactiveRoomsList,
  selectMessagesLoaded, selectCreateRoomDialogOpened,
} from '../../modules/rooms/rooms.selectors';
import { selectLoggedUser, selectUsers, selectUsersInActiveRoom } from '../../modules/users/users.selectors';
import { UserAuthActions } from '../../modules/userAuth/userAuth.redux';

const mapStateToProps = createStructuredSelector({
  activeRoom: selectActiveRoom,
  roomMessages: selectMessages,
  activeRooms: selectActiveRoomsList,
  inactiveRooms: selectInactiveRoomsList,
  messagesLoaded: selectMessagesLoaded,
  createRoomDialogOpened: selectCreateRoomDialogOpened,
  loggedUser: selectLoggedUser,
  users: selectUsers,
  usersInRoom: selectUsersInActiveRoom,
});

export const mapDispatchToProps = (dispatch) => bindActionCreators({
  setActiveRoomId: RoomsActions.setActiveRoomId,
  leaveRoom: RoomsActions.removeUserFromRoom,
  createMessage: RoomsActions.createMessage,
  closeCreateRoomDialog: RoomsActions.closeCreateRoomDialog,
  openCreateRoomDialog: RoomsActions.openCreateRoomDialog,
  createRoom: RoomsActions.createRoom,
  signOut: UserAuthActions.signOut,
}, dispatch);

export default hot(module)(compose(
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps)
)(Room));

