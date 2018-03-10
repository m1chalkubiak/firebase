import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Map } from 'immutable';
import { always, ifElse, identity, equals, complement } from 'ramda';

import { Wrapper } from './userAvatar.styles';

export class UserAvatar extends PureComponent {
  static propTypes = {
    user: PropTypes.instanceOf(Map),
    small: PropTypes.bool,
    status: PropTypes.string,
  };

  static defaultProps = {
    user: Map(),
    small: false,
  };

  get isSmall() {
    return ifElse(
      identity,
      always({ small: true }),
      always(null),
    )(this.props.small);
  }

  get isOffline() {
    return ifElse(
      complement(equals('online')),
      always({ offline: true }),
      always(null),
    )(this.props.status);
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
