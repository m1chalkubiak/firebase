import styled from 'styled-components';
import { ListItem } from 'material-ui/List';

import { theme } from '../../theme/global';

export const UserItem = styled(ListItem)`
  && {
    padding-top: ${theme.spacing.unit}px;
    padding-bottom: ${theme.spacing.unit}px;
  }
`;
