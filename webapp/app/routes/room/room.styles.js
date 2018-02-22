import styled, { css } from 'styled-components';
import { when, propEq } from 'ramda';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import Drawer from 'material-ui/Drawer';
import { createMuiTheme } from 'material-ui/styles';

const theme = createMuiTheme();
const drawerWidth = 240;

const getMenuDrawerHidden = () => when(
  propEq('hidden', true),
  () => css`
  width: 60px;
  overflow-x: hidden;
  transition: width ${theme.transitions.duration.enteringScreen} ${theme.transitions.easing.sharp}; 
  `,
);


export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const MenuDrawerInner = styled.div`
  width: ${drawerWidth};
`;

export const MenuDrawerHeader = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding: 0 8px;
    ${theme.mixins.toolbar};
`;

export const MenuButton = styled(IconButton)`
  margin-left: 12px;
  margin-right: 36px;
  
  display: ${props => props.hidden ? 'none' : null};
`;

export const MenuDrawer = styled(Drawer)`
  position: relative;
  height: 100%;
  width: ${drawerWidth};
  transition: width ${theme.transitions.duration.enteringScreen} ${theme.transitions.easing.sharp};
  
`;

export const ApplicationBar = styled(AppBar)`
  position: absolute;
  z-index: theme.zIndex.drawer + 1;
  transition: all ${theme.transitions.duration.leavingScreen} ${theme.transitions.easing.sharp};
  transition-property: width, margin;
  
  margin-left: ${props => props.shift ? drawerWidth : null};
  width: ${props => props.shift ? 'calc(100% - ' + drawerWidth + 'px)' : null};
  transition-duration: ${props => props.shift ? theme.transitions.duration.enteringScreen : null};
`;
