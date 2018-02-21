import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import { hot } from 'react-hot-loader';

import { Home } from './home.component';
import { LocalesActions } from '../../modules/locales/locales.redux';
import { selectLocalesLanguage } from '../../modules/locales/locales.selectors';
import { RoomsActions } from '../../modules/rooms/rooms.redux';
import { selectActiveRoom, selectMessages } from '../../modules/rooms/rooms.selectors';

const mapStateToProps = createStructuredSelector({
  language: selectLocalesLanguage,
  activeRoom: selectActiveRoom,
  messages: selectMessages,
});

export const mapDispatchToProps = (dispatch) => bindActionCreators({
  setLanguage: LocalesActions.setLanguage,
  setActiveAgentId: RoomsActions.setActiveRoomId,
  createMessage: RoomsActions.createMessage,
}, dispatch);

export default hot(module)(connect(mapStateToProps, mapDispatchToProps)(Home));
