import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { Map } from 'immutable';
import classNames from 'classnames';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import IconButton from 'material-ui/IconButton';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Divider from 'material-ui/Divider';
import MenuIcon from 'material-ui-icons/Menu';
import ChevronLeftIcon from 'material-ui-icons/ChevronLeft';

import { Wrapper, Container, MenuDrawerInner, MenuDrawerHeader, Content } from './room.styles';
import { MessageList, MessageBox, RoomList } from '../../components/';


export class Room extends PureComponent {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    messages: PropTypes.instanceOf(Map),
    rooms: PropTypes.instanceOf(Map),
    createMessage: PropTypes.func.isRequired,
    setActiveRoomId: PropTypes.func.isRequired,
    match: PropTypes.object.isRequired,
    activeRoom: PropTypes.object,
    messagesLoaded: PropTypes.bool,
  };

  state = {
    open: true,
  };

  componentWillMount = () => this.props.setActiveRoomId(this.props.match.params.id);

  componentWillReceiveProps({ match: { params: { id } } }) {
    if (id !== this.props.match.params.id) {
      this.props.setActiveRoomId(id);
    }
  }

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { classes, messages, createMessage, rooms, activeRoom, messagesLoaded } = this.props;
    const appBarClasses = classNames(classes.appBar, {
      [classes.appBarShift]: this.state.open,
    });
    const iconButtonClasses = classNames(classes.menuButton, {
      [classes.hide]: this.state.open,
    });
    const drawerPaperClasses = classNames(classes.drawerPaper, {
      [classes.drawerPaperClose]: !this.state.open,
    });

    return (
      <Wrapper>
        <Container>
          <Helmet title={activeRoom.get('name')} />
          <AppBar className={appBarClasses}>
            <Toolbar disableGutters={!this.state.open}>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={this.handleDrawerOpen}
                className={iconButtonClasses}
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="title" color="inherit" noWrap>
                Firebase Chat
              </Typography>
            </Toolbar>
          </AppBar>
          <Drawer
            variant="permanent"
            classes={{ paper: drawerPaperClasses }}
            open={this.state.open}
          >
            <MenuDrawerInner>
              <MenuDrawerHeader className={classes.drawerHeader}>
                <IconButton onClick={this.handleDrawerClose}>
                  <ChevronLeftIcon />
                </IconButton>
              </MenuDrawerHeader>
              <Divider />
              <RoomList rooms={rooms} activeRoom={activeRoom} />
            </MenuDrawerInner>
          </Drawer>
          <Content>
            <MessageList loaded={messagesLoaded} messages={messages} />
            <MessageBox onCreateMessage={createMessage} />
          </Content>
        </Container>
      </Wrapper>
    );
  }
}
