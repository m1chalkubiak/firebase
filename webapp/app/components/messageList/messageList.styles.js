import styled, { css } from 'styled-components';
import { Card, CircularProgress } from 'material-ui';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  width: 100%;
  height: calc(100% - 70px);
`;

export const Content = styled(Card)`
  overflow-y: scroll;
`;

export const Loader = styled(CircularProgress)`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const defaultMessagesWrapper = css`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 70px;
`;

export const NoMessages = styled.div`
  ${defaultMessagesWrapper}
`;

export const LoaderWrapper = styled.div`
  ${defaultMessagesWrapper}
`;

