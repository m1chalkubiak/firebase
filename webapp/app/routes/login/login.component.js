import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import Typography from 'material-ui/Typography';

import { Wrapper, LoginContainer, LoginButton, LoginIcon } from './login.styles';
import messages from '../../components/createRoomDialog/createRoomDialog.messages';


export class Login extends PureComponent {
  static propTypes = {
    signInViaFacebook: PropTypes.func.isRequired,
  };

  render() {
    const { signInViaFacebook } = this.props;

    return (
      <Wrapper>
        <Helmet title="Login" />
        <LoginContainer>
          <Typography variant="headline" gutterBottom>
            Want to log in ?
          </Typography>
          <LoginButton variant="raised" color="primary" onClick={signInViaFacebook}>
            via Facebook
            <LoginIcon />
          </LoginButton>
        </LoginContainer>
      </Wrapper>
    );
  }
}
