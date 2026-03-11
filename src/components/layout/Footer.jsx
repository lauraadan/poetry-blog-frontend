import { Box, Typography } from "@mui/material";

export default function Footer() {
  return (
    <Box
      sx={{
        textAlign: "center",
        p: 3,
        mt: 6,
        background: "#f5f5f5",
      }}
    >
      <Typography variant="body2">©2026 Laura Adán</Typography>
    </Box>
  );
}
