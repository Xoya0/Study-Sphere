import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "light", // You can switch to "dark" if you prefer a dark theme
    primary: {
      main: "#1976d2",
    },
    secondary: {
      main: "#f50057",
    },
  },
});

export default theme;
