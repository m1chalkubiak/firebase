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
  selectActiveRoom, selectMessages, selectRoomsList, selectMessagesLoaded,
} from '../../modules/rooms/rooms.selectors';

const mapStateToProps = createStructuredSelector({
  activeRoom: selectActiveRoom,
  messages: selectMessages,
  rooms: selectRoomsList,
  messagesLoaded: selectMessagesLoaded,
});

export const mapDispatchToProps = (dispatch) => bindActionCreators({
  setActiveRoomId: RoomsActions.setActiveRoomId,
  createMessage: RoomsActions.createMessage,
}, dispatch);

export default hot(module)(compose(
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps)
)(Room));

