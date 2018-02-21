import styled from 'styled-components';
import { Card, TextField } from 'material-ui';

export const Wrapper = styled(Card)`
  width: 100%;
  padding: 15px;
  display: flex;
  justify-content: space-between;
`;

export const Field = styled(TextField)`
 width: calc(100% - 55px)
`;
