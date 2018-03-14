import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { Map } from 'immutable';
import classNames from 'classnames';
import { ifElse, always, complement, equals, multiply } from 'ramda';
import { FormattedMessage } from 'react-intl';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import IconButton from 'material-ui/IconButton';
import Button from 'material-ui/Button';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Divider from 'material-ui/Divider';
import MenuIcon from 'material-ui-icons/Menu';
import ChevronLeftIcon from 'material-ui-icons/ChevronLeft';
import WhatsHotIcon from 'material-ui-icons/Whatshot';
import DeleteIcon from 'material-ui-icons/Delete';

import { Wrapper, Container, MenuDrawerInner, MenuDrawerHeader,
  MenuDrawerContent, MenuDrawerFooter, Dropzone } from './room.styles';
import { MessageList, MessageBox, RoomList, UsersList,
  CreateRoomDialog, UserMenu, DropzoneBackdrop } from '../../components/';
import { DEFAULT_ROOM } from '../../modules/rooms/rooms.redux';
import messages from './room.messages';


const megabytes = multiply(2 ** 20);

export class Room extends PureComponent {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    roomMessages: PropTypes.instanceOf(Map),
    activeRooms: PropTypes.instanceOf(Map),
    inactiveRooms: PropTypes.instanceOf(Map),
    createMessage: PropTypes.func.isRequired,
    createImageMessage: PropTypes.func.isRequired,
    setActiveRoomId: PropTypes.func.isRequired,
    match: PropTypes.object.isRequired,
    activeRoom: PropTypes.object,
    messagesLoaded: PropTypes.bool.isRequired,
    createRoomDialogOpened: PropTypes.bool.isRequired,
    closeCreateRoomDialog: PropTypes.func.isRequired,
    openCreateRoomDialog: PropTypes.func.isRequired,
    createRoom: PropTypes.func.isRequired,
    signOut: PropTypes.func.isRequired,
    leaveRoom: PropTypes.func.isRequired,
    loggedUser: PropTypes.instanceOf(Map),
    users: PropTypes.instanceOf(Map),
    usersInRoom: PropTypes.instanceOf(Map),
  };

  state = {
    open: true,
    fileDragged: false,
  };

  componentWillMount = () => this.props.setActiveRoomId(this.props.match.params.id);

  componentWillReceiveProps({ match: { params: { id } } }) {
    if (id !== this.props.match.params.id) {
      this.props.setActiveRoomId(id);
    }
  }

  handleDropAccepted = ([file]) => {
    this.props.createImageMessage(this.props.loggedUser.get('uid', null), file);
    this.setState({ fileDragged: false });
  };

  handleDragEnter = () => this.setState({ fileDragged: true });

  handleDragLeave = () => this.setState({ fileDragged: false });

  handleDrawerOpen = () => this.setState({ open: true });

  handleDrawerClose = () => this.setState({ open: false });

  renderDrawerFooter() {
    const { activeRoom, classes, leaveRoom } = this.props;

    return ifElse(
      complement(equals(DEFAULT_ROOM)),
      () => (
        <MenuDrawerFooter>
          <Button variant="flat" className={classes.leaveRoomButton} fullWidth onClick={leaveRoom}>
            <DeleteIcon color="action" className={classes.leaveRoomIcon} />
            <Typography className={classes.leaveRoomLabel} variant="subheading" color="inherit" noWrap>
              <FormattedMessage {...messages.leaveRoom} />
            </Typography>
          </Button>
        </MenuDrawerFooter>
      ),
      always(null),
    )(activeRoom.get('id'));
  }

  render() {
    const {
      classes, roomMessages, createMessage, activeRooms, inactiveRooms, activeRoom, messagesLoaded,
      createRoomDialogOpened, closeCreateRoomDialog, openCreateRoomDialog, createRoom, signOut, loggedUser,
      users, usersInRoom,
    } = this.props;

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
              <Typography className={classes.flex} variant="title" color="inherit" noWrap>
                <WhatsHotIcon />
                <FormattedMessage {...messages.appName} />
              </Typography>

              <UserMenu user={loggedUser} onSignOut={signOut} />
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
              <MenuDrawerContent>
                <RoomList
                  activeRooms={activeRooms}
                  inactiveRooms={inactiveRooms}
                  activeRoom={activeRoom}
                  onOpenCreateRoomDialog={openCreateRoomDialog}
                />
                <Divider />
                <UsersList users={usersInRoom} />
              </MenuDrawerContent>

              { this.renderDrawerFooter() }

            </MenuDrawerInner>
          </Drawer>
          <Dropzone
            onDropAccepted={this.handleDropAccepted}
            onDragEnter={this.handleDragEnter}
            onDragLeave={this.handleDragLeave}
            disableClick
            multiple={false}
            maxSize={megabytes(2)}
            accept="image/jpeg, image/png, image/gif"
          >
            <MessageList users={users} loaded={messagesLoaded} messages={roomMessages} />
            <MessageBox user={loggedUser} onCreateMessage={createMessage} />
            <DropzoneBackdrop open={this.state.fileDragged} />
          </Dropzone>
        </Container>
        <CreateRoomDialog
          opened={createRoomDialogOpened}
          onCloseAction={closeCreateRoomDialog}
          onCreateRoom={createRoom}
        />
      </Wrapper>
    );
  }
}
