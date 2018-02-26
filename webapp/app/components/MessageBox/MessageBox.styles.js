import styled from 'styled-components';
import { Card, TextField as Field } from 'material-ui';

export const Wrapper = styled(Card)`
  width: 100%;
  padding: 15px;
  display: flex;
  justify-content: space-between;
`;

export const Form = styled.form`
 width: calc(100% - 55px)
`;

export const TextField = styled(Field)`
 width: 100%;
`;
