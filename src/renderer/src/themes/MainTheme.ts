import { createTheme } from '@mui/material/styles';


const GRAY_100 = '#f5f5f5';
const GRAY_300 = '#cccccc';
const GRAY_500 = '#808080';
const GRAY_700 = '#4d4d4d';

const WHITE = '#ffffff';
const BLACK = '#000000';

const PRIMARY_MAIN = '#7ab7ff';
const SECONDARY_MAIN = '#5e83b3';
const TEXT_PRIMARY = GRAY_100; // Updated to use GRAY_100
const TEXT_SECONDARY = GRAY_300; // Updated to use GRAY_300
const TEXT_DISABLED = GRAY_500; // Updated to use GRAY_500
const BACKGROUND_DEFAULT = '#212121';
const BACKGROUND_PAPER = GRAY_700; // Updated to use GRAY_700
const APPBAR_BACKGROUND = BLACK; // Corrected color code and used BLACK const
const BUTTON_BACKGROUND = BLACK; // Used BLACK const

const theme = createTheme({
    palette: {
      mode: 'dark',
      primary: {
        main: PRIMARY_MAIN,
      },
      secondary: {
        main: SECONDARY_MAIN,
      },
      text: {
        primary: TEXT_PRIMARY,
        secondary: TEXT_SECONDARY,
        disabled: TEXT_DISABLED,
        //hint: GRAY_700, // Uncommented and used GRAY_700
      },
      background: {
        default: BACKGROUND_DEFAULT,
        paper: BACKGROUND_PAPER, 
      },
      divider: 'hsla(0,0%,100%,.1)', 
    },
    components: {
      MuiAppBar: {
        styleOverrides: {
          root: {
            backgroundColor: APPBAR_BACKGROUND, 
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            backgroundColor: WHITE,
            color: BLACK,
            '&:hover': {
              backgroundColor: GRAY_300,
            },
            
          },
        },
      },
    },
  });

export default theme;