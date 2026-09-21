// Footer component for the bottom of the website, shows up on every page
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";

// Footer component that displays copyright information and links to Next.js, Material UI, and GitHub
export default function Footer() {
  return (
    <Box component="footer" sx={{ bgcolor: "action.hover", py: 6 }}>
      <Container>
        <Typography variant="subtitle1" align="center" color="text.secondary">
          &copy; {new Date().getFullYear()} Oliver Dimes. Built with{" "}
          <Link href="https://nextjs.org">Next.js</Link>,{" "}
          <Link href="https://mui.com">Material UI</Link> and{" "}
          <Link href="https://github.com/effeect/what-time-is-f1-next">
            GitHub
          </Link>
        </Typography>
      </Container>
    </Box>
  );
}
