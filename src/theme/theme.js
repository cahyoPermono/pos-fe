import { createMuiTheme } from "@material-ui/core/styles";
import * as colors from "@material-ui/core/colors";

const monoPrime = "#465775";
const secondPrime = "#7ae8be";

export default createMuiTheme({
  palette: {
    common: {
      monoGray: monoPrime,
      monoGreen: secondPrime,
    },
    primary: {
      main: monoPrime,
    },
    secondary: {
      main: secondPrime,
    },
  },

  overrides: {
    MuiDrawer: {
      paper: {
        backgroundColor: monoPrime,
        color: colors.grey[400],
        "& .MuiListItemIcon-root": {
          color: "inherit"
        },
        "& .MuiDivider-root": {
          backgroundColor: "currentColor",
          opacity: 0.3
        },
        "& .MuiIconButton-root": {
          color: colors.grey[400],
        }
      }
    }
  }
});
