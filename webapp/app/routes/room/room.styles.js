import styled from 'styled-components';
import { createMuiTheme } from 'material-ui/styles';

const theme = createMuiTheme();
const drawerWidth = 240;


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
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  drawerPaper: {
    position: 'relative',
    height: '100%',
    width: drawerWidth,
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
  width: ${drawerWidth}px;
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
