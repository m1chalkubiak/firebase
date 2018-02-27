import styled from 'styled-components';
import DialogActions from 'material-ui/Dialog/DialogActions';

import { theme } from '../../theme/global';


export const DialogActionsContainer = styled(DialogActions)`
  padding: ${theme.spacing.unit * 2}px;
`;
