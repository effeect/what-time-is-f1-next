import { createTheme } from "@mui/material/styles";

// Follows the OS light/dark preference, like Bulma did
const theme = createTheme({
  cssVariables: { colorSchemeSelector: "media" },
  colorSchemes: { light: true, dark: true },
  palette: {
    primary: { main: "#485fc7" },
  },
  typography: {
    fontFamily: "var(--font-geist-sans), Arial, Helvetica, sans-serif",
  },
});

export default theme;
