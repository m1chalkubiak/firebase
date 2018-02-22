import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { Map } from 'immutable';
import Toolbar from 'material-ui/Toolbar';
import List from 'material-ui/List';
import Typography from 'material-ui/Typography';
import Divider from 'material-ui/Divider';
import MenuIcon from 'material-ui-icons/Menu';
import ChevronLeftIcon from 'material-ui-icons/ChevronLeft';

import { Container, ApplicationBar, MenuButton, MenuDrawer, MenuDrawerInner, MenuDrawerHeader } from './room.styles';
import { MessageList } from '../../components/MessageList/MessageList.component';
import { MessageBox } from '../../components/MessageBox/MessageBox.component';
import { RoomList } from '../../components/';



const styles = theme => ({
  root: {
    width: '100%',
    height: 430,
    marginTop: theme.spacing.unit * 3,
    zIndex: 1,
    overflow: 'hidden',
  },
  appFrame: {
    position: 'relative',
    display: 'flex',
    width: '100%',
    height: '100%',
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
  drawerInner: {
    // Make the items inside not wrap when transitioning:
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  content: {
    width: '100%',
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: 24,
    height: 'calc(100% - 56px)',
    marginTop: 56,
    [theme.breakpoints.up('sm')]: {
      height: 'calc(100% - 64px)',
      marginTop: 64,
    },
  },
});


export class Room extends PureComponent {
  static propTypes = {
    messages: PropTypes.instanceOf(Map),
    rooms: PropTypes.instanceOf(Map),
    createMessage: PropTypes.func.isRequired,
    setActiveRoomId: PropTypes.func.isRequired,
    match: PropTypes.object.isRequired,
  };

  state = {
    open: false,
  };

  componentWillMount = () => this.props.setActiveRoomId(this.props.match.params.id);

  get applicationBarProps() {
    if (this.state.open) {
      return {
        shift: 'true',
      };
    }
  }

  get menuButtonProps() {
    if (this.state.open) {
      return {
        hidden: true,
      };
    }
  }

  get menuDrawerProps() {
    if (!this.state.open) {
      return {
        hidden: true,
      };
    }
  }

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { messages, createMessage, rooms } = this.props;

    return (
      <Container>
        <Helmet title="Main room" />
        <ApplicationBar {...this.applicationBarProps}>
          <Toolbar disableGutters={!this.state.open}>
            <MenuButton
              color="inherit"
              aria-label="open drawer"
              onClick={this.handleDrawerOpen}
              {...this.menuButtonProps}
            >
              <MenuIcon />
            </MenuButton>
            <Typography variant="title" color="inherit" noWrap>
              Mini variant drawer
            </Typography>
          </Toolbar>
        </ApplicationBar>
        <MenuDrawer
          variant="permanent"
          open={this.state.open}
          {...this.menuDrawerProps}
        >
          <MenuDrawerInner>
            <MenuDrawerHeader>
              <MenuButton onClick={this.handleDrawerClose}>
                <ChevronLeftIcon />
              </MenuButton>
            </MenuDrawerHeader>
            <Divider />
            <RoomList rooms={rooms} />
            <Divider />
            {/*<List>{otherMailFolderListItems}</List>*/}
          </MenuDrawerInner>
        </MenuDrawer>
        <MessageList messages={messages} />
        <MessageBox onCreateMessage={createMessage} />
      </Container>
    );
  }
}
