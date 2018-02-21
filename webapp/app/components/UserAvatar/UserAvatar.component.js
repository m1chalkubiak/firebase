import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { ifElse, complement, both, isNil, isEmpty } from 'ramda';
import Avatar from 'material-ui/Avatar';
import PersonIcon from 'material-ui-icons/Person';


export class UserAvatar extends PureComponent {
  static propTypes = {
    data: PropTypes.object,
  };

  render = () => ifElse(
    complement(both(isNil, isEmpty)),
    () => (
      <Avatar>
        <PersonIcon />
      </ Avatar>
    ),
    () => (
      <Avatar
        alt={data.alt}
        src={data.src}
      />
    ),
  )(this.props.data);
}
