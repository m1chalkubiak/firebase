import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Avatar from 'material-ui/Avatar';
import { Map } from 'immutable';


export class UserAvatar extends PureComponent {
  static propTypes = {
    user: PropTypes.instanceOf(Map),
  };

  static defaultProps = {
    user: Map(),
  };

  render = () => (
    <Avatar
      alt={this.props.user.get('displayName', '')}
      src={this.props.user.get('profilePhoto', '')}
    />
  );
}
