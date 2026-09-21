import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

const Navbar = () => {
  return (
    <AppBar position="static" color="transparent" elevation={0}>
      <Toolbar sx={{ justifyContent: "center", minHeight: { xs: 64 } }}>
        <Typography component="h1" variant="h4" sx={{ fontWeight: "bold" }}>
          What Time Is F1?
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
