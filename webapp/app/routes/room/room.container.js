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
  selectActiveRoom, selectMessages, selectRoomsList, selectMessagesLoaded, selectCreateRoomDialogOpened,
} from '../../modules/rooms/rooms.selectors';
import { selectLoggedUser, selectUsers } from '../../modules/users/users.selectors';
import { UserAuthActions } from '../../modules/userAuth/userAuth.redux';

const mapStateToProps = createStructuredSelector({
  activeRoom: selectActiveRoom,
  roomMessages: selectMessages,
  rooms: selectRoomsList,
  messagesLoaded: selectMessagesLoaded,
  createRoomDialogOpened: selectCreateRoomDialogOpened,
  loggedUser: selectLoggedUser,
  users: selectUsers,
});

export const mapDispatchToProps = (dispatch) => bindActionCreators({
  setActiveRoomId: RoomsActions.setActiveRoomId,
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

