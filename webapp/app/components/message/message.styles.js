import styled from 'styled-components';
import { colors } from 'material-ui';

export const Data = styled.span`
  color: ${colors.grey['500']};
  font-size: 0.8rem;
  margin-left: 0.4rem;
`;

export const MessageContent = styled.span`
  color: ${colors.grey['900']};
  font-size: 1rem;
`;

export const MessageImage = styled.img`
  max-height: 300px;
  max-width: 500px;
`;

export const Author = styled.strong`
  color: ${colors.grey['800']};
  font-size: 1rem;
`;
