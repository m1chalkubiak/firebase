import styled from 'styled-components';
import { theme, DRAWER_WIDTH } from '../../theme/global';


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
`;

export const MenuDrawerHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 0 ${theme.spacing.unit}px;
`;

export const Content = styled.main`
  width: 100%;
  flex-grow: 1;
  background-color: ${theme.palette.background.default};
  height: calc(100% - ${theme.spacing.unit * 8}px);
  margin-top: ${theme.spacing.unit * 8}px;
`;
