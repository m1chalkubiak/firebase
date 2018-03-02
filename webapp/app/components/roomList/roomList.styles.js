import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { colors } from 'material-ui';

export const RoomLink = styled(Link)`
  display: flex;
  color: ${colors.grey['800']};
  text-decoration: none;
  
  background-color: ${props => props.active && colors.grey['300']};
`;
