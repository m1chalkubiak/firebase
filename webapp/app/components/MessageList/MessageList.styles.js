import styled from 'styled-components';
import { Card, CircularProgress } from 'material-ui';

export const Wrapper = styled(Card)`
 display: flex;
 flex-direction: column;
 justify-content: flex-end;
 width: 100%;
 height: 100%;
`;

export const Loader = styled(CircularProgress)`
 display: flex;
 flex-direction: row;
 justify-content: center;
 align-items: center;
 width: 100%;
 height: 100%;
`;
