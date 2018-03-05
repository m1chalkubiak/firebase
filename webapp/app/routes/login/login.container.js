import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import { hot } from 'react-hot-loader';
import { compose } from 'ramda';

import { Login } from './login.component';
import { UserAuthActions } from '../../modules/userAuth/userAuth.redux';
import { selectLoggedUser } from '../../modules/users/users.selectors';

const mapStateToProps = createStructuredSelector({
  loggedUser: selectLoggedUser,
});

export const mapDispatchToProps = (dispatch) => bindActionCreators({
  signInViaFacebook: UserAuthActions.signInViaFacebook,
}, dispatch);

export default hot(module)(compose(
  connect(mapStateToProps, mapDispatchToProps)
)(Login));

