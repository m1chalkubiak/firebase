import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import IconButton from 'material-ui/IconButton';
import AccountCircle from 'material-ui-icons/AccountCircle';
import Menu, { MenuItem } from 'material-ui/Menu';


export class UserMenu extends PureComponent {
  static propTypes = {
    data: PropTypes.object,
    onSignOut: PropTypes.func.isRequired,
  };

  static defaultProps = {
    data: {},
  };

  state = {
    anchorEl: null,
  };

  get open() {
    return Boolean(this.state.anchorEl);
  }

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  render = () => (
    <div>
      <IconButton
        aria-owns={this.open ? 'menu-appbar' : null}
        aria-haspopup="true"
        onClick={this.handleMenu}
        color="inherit"
      >
        <AccountCircle />
      </IconButton>
      <Menu
        id="menu-appbar"
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
        <MenuItem onClick={this.props.onSignOut}>Log Out</MenuItem>
      </Menu>
    </div>
  );
}
