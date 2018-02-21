import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import { hot } from 'react-hot-loader';

import { Home } from './home.component';
import { MaintainersActions } from '../../modules/maintainers/maintainers.redux';
import { selectMaintainersItems } from '../../modules/maintainers/maintainers.selectors';
import { LocalesActions } from '../../modules/locales/locales.redux';
import { selectLocalesLanguage } from '../../modules/locales/locales.selectors';
import { RoomsActions } from '../../modules/rooms/rooms.redux';
import { selectActiveRoom, selectMessages } from '../../modules/rooms/rooms.selectors';

const mapStateToProps = createStructuredSelector({
  items: selectMaintainersItems,
  language: selectLocalesLanguage,
  activeRoom: selectActiveRoom,
  messages: selectMessages,
});

export const mapDispatchToProps = (dispatch) => bindActionCreators({
  setLanguage: LocalesActions.setLanguage,
  fetchMaintainers: MaintainersActions.fetch,
  setActiveAgentId: RoomsActions.setActiveRoomId,
  createMessage: RoomsActions.createMessage,
}, dispatch);

export default hot(module)(connect(mapStateToProps, mapDispatchToProps)(Home));
