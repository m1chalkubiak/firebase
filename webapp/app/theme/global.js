import { createMuiTheme } from 'material-ui/styles';
import { injectGlobal } from 'styled-components';

// eslint-disable-next-line
injectGlobal`
  html.unsupported {
    .unsupported-page {
      display: block !important;
    }
  
    #app {
      display: none;
    }
  }
`;

export const theme = createMuiTheme();
export const DRAWER_WIDTH = 240;
export const FOOTER_HEIGHT = 61;
