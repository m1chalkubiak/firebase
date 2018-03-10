import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Map } from 'immutable';
import IconButton from 'material-ui/IconButton';
import Menu, { MenuItem } from 'material-ui/Menu';
import { FormattedMessage } from 'react-intl';

import { UserAvatar } from '../userAvatar/userAvatar.component';
import messages from './userMenu.messages';


export class UserMenu extends PureComponent {
  static propTypes = {
    user: PropTypes.instanceOf(Map),
    onSignOut: PropTypes.func.isRequired,
  };

  state = {
    anchorEl: null,
  };

  get open() {
    return !!this.state.anchorEl;
  }

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  handleOpen = ({ currentTarget: anchorEl }) => this.setState({ anchorEl });

  render = () => (
    <div>
      <IconButton
        aria-owns={this.open ? 'menu-appBar' : null}
        aria-haspopup="true"
        onClick={this.handleOpen}
        color="inherit"
      >
        <UserAvatar user={this.props.user} />
      </IconButton>
      <Menu
        id="menu-appBar"
        anchorEl={this.state.anchorEl}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={this.open}
        onClose={this.handleClose}
      >
        <MenuItem onClick={this.props.onSignOut}>
          <FormattedMessage {...messages.logOut} />
        </MenuItem>
      </Menu>
    </div>
  );
}
