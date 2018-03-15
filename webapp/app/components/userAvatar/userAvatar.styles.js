import styled from 'styled-components';
import Avatar from 'material-ui/Avatar';

import { theme } from '../../theme/global';

export const Wrapper = styled(Avatar)`
  && {
    margin-top: 2px;
    width: ${props => props.small && `${theme.spacing.unit * 3}px`};
    height: ${props => props.small && `${theme.spacing.unit * 3}px`};
    margin-right: ${props => props.small && `${theme.spacing.unit * 2}px`};

    & > img {
      filter: ${props => props.offline && props.small && 'grayscale(1)'};
    }
  }
`;
