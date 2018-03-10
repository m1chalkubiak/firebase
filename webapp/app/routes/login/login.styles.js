import styled from 'styled-components';
import Paper from 'material-ui/Paper';
import SendIcon from 'material-ui-icons/Send';
import Button from 'material-ui/Button';

import { theme } from '../../theme/global';

export const Wrapper = styled.section`
  width: 100%;
  height: 100vh;
  z-index: 1;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const LoginContainer = styled(Paper)`
  width: 50%;
  min-width: 320px;
  min-height: 30vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const LoginIcon = styled(SendIcon)`
  && {
    margin-left: ${theme.spacing.unit}px;
  }
`;

export const LoginButton = styled(Button)`
  && {
    margin: ${theme.spacing.unit}px;
  }
`;

