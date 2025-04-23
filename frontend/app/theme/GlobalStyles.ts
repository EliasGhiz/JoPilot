// GlobalStyles.ts - Global custom styles applied across the application

import { GlobalStylesProps } from '@mui/material/GlobalStyles';
import { Theme } from '@mui/material/styles';

const globalScrollbarStyles: GlobalStylesProps['styles'] = (theme: Theme) => ({
  "*::-webkit-scrollbar": {
    width: "8px",
    height: "8px",
  },
  "*::-webkit-scrollbar-track": {
    background: "inherit",
    borderRadius: "9999px",
  },
  "*::-webkit-scrollbar-thumb": {
    backgroundColor: theme.palette.mode === 'dark' ? "#424242" : "#c1c1c1",
    borderRadius: "9999px",
    border: "2px solid transparent",
    backgroundClip: "content-box",
  },
  "*::-webkit-scrollbar-button": {
    display: "none",
  },
});

export default globalScrollbarStyles;
