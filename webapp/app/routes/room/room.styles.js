import styled from 'styled-components';
import ReactDropzone from 'react-dropzone';
import { ifElse, always, prop } from 'ramda';

import { theme, DRAWER_WIDTH, FOOTER_HEIGHT } from '../../theme/global';


export default theme => ({
  appBar: {
    position: 'absolute',
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: DRAWER_WIDTH,
    width: `calc(100% - ${DRAWER_WIDTH}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 24,
  },
  hide: {
    display: 'none',
  },
  drawerPaper: {
    position: 'relative',
    height: '100%',
    width: DRAWER_WIDTH,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    width: 60,
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  drawerHeader: {
    ...theme.mixins.toolbar,
  },
  leaveRoomButton: {
    justifyContent: 'flex-start',
    textTransform: 'none',
  },
  leaveRoomLabel: {
    paddingLeft: theme.spacing.unit * 2,
    paddingRight: theme.spacing.unit * 2,
  },
  leaveRoomIcon: {
    marginRight: theme.spacing.unit * 2,
  },
  flex: {
    flex: 1,
  },
});

export const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  z-index: 1;
  overflow: hidden;
`;

export const Container = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  height: 100%;
`;

export const MenuDrawerInner = styled.div`
  width: ${DRAWER_WIDTH}px;
  display:flex;
  flex-direction: column;
  height: 100%;
`;

export const MenuDrawerHeader = styled.div`

  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 0 ${theme.spacing.unit}px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.12);
`;

export const MenuDrawerContent = styled.div`
  flex: 1;
  overflow-y: auto;
`;

export const MenuDrawerFooter = styled.div`
  height: ${FOOTER_HEIGHT}px;
  border-top: 1px solid rgba(0, 0, 0, 0.12);
  display: flex;
  align-items: center;
`;

export const Dropzone = styled(ReactDropzone)`
  position: relative;
  width: 100%;
  flex-grow: 1;
  background-color: ${theme.palette.background.default};
  height: calc(100% - ${theme.spacing.unit * 8}px);
  margin-top: ${theme.spacing.unit * 8}px;
`;