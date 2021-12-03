import { createTheme } from "@material-ui/core/styles";

const trackOrange = "#fea02f";
const trackBlue = "#007a7a";

export default createTheme({
  palette: {
    common: {
      blue: `${trackBlue}`,
      orange: `${trackOrange}`,
    },
    primary: {
      main: `${trackOrange}`,
    },
    secondary: {
      main: `${trackBlue}`,
    },
  },
});
