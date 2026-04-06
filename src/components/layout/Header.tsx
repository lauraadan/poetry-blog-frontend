import { Box, Typography, Container, AppBar, Toolbar } from "@mui/material";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";

import SocialLinks from "../common/SocialLinks";

export default function Header() {
  return (
    <Box
      sx={{
        backgroundColor: "#fff",
        textAlign: "center",
        pb: { xs: 4, md: 6 },
        borderBottom: "1px solid #eee",
        mb: 4,
      }}
    >
      <AppBar position="sticky" color="transparent" elevation={0}>
        <Toolbar sx={{ justifyContent: "flex-end" }}>
          <SocialLinks />
        </Toolbar>
      </AppBar>

      <Container maxWidth="md">
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 2,
            mb: 2,
          }}
        >
          <Box
            component="img"
            src={logo}
            alt="logo"
            sx={{
              width: { xs: 60, md: 80 },
              height: "auto",
            }}
          />

          <Typography
            component={Link}
            to="/"
            sx={{
              display: "block",
              textDecoration: "none",
              color: "#a21717",
              fontSize: { xs: "1.5rem", md: "3.5rem" },
              fontWeight: 700,
              letterSpacing: "0.02em",
              lineHeight: 1.1,
            }}
          >
            Los hilos que nos tejen
            <br />y otras historias
          </Typography>
        </Box>

        <Typography
          sx={{
            fontSize: "1rem",
            maxWidth: 800,
            margin: "0 auto",
            lineHeight: 1.6,
          }}
        >
          Este es mi blog personal, un rincón de expresión propio en que escribo
          para curar.
        </Typography>
      </Container>
    </Box>
  );
}
