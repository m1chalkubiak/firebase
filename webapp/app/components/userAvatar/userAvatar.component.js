import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Map } from 'immutable';
import { always, ifElse, identity, equals } from 'ramda';

import { Wrapper } from './userAvatar.styles';

export class UserAvatar extends PureComponent {
  static propTypes = {
    user: PropTypes.instanceOf(Map),
    small: PropTypes.bool,
  };

  static defaultProps = {
    user: Map(),
    small: false,
  };

  get isSmall() {
    return ifElse(
      identity,
      always({ small: 'small' }),
      always(null),
    )(this.props.small);
  }

  get isOffline() {
    return ifElse(
      equals('online'),
      always(null),
      always({ offline: 'offline' }),
    )(this.props.user.get('status'));
  }

  render = () => (
    <Wrapper
      {...this.isOffline}
      {...this.isSmall}
      alt={this.props.user.get('displayName', '')}
      src={this.props.user.get('profilePhoto', '')}
    />
  );
}
