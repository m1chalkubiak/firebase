import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { ifElse, both, complement, isNil, gte } from 'ramda';
import Avatar from 'material-ui/Avatar';
import PersonIcon from 'material-ui-icons/Person';
import { Map } from 'immutable';


export class UserAvatar extends PureComponent {
  static propTypes = {
    user: PropTypes.instanceOf(Map),
  };

  static defaultProps = {
    user: Map(),
  };

  render = () => ifElse(
    isNil,
    () => (
      <Avatar>
        <PersonIcon />
      </ Avatar>
    ),
    () => (
      <Avatar
        alt={this.props.user.get('displayName', '')}
        src={this.props.user.get('profilePhoto', '')}
      />
    ),
  )(this.props.user);
}
