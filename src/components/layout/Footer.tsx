import { Box, Typography } from "@mui/material";

interface Props {
  year?: number;
  name?: string;
  email?: string;
}

export default function Footer({
  year = new Date().getFullYear(),
  name = "Laura Adán",
  email = "info@lauraadan.com",
}: Props) {
  return (
    <Box
      sx={{
        textAlign: "center",
        p: 3,
        mt: 6,
        background: "#f5f5f5",
      }}
    >
      <Typography variant="body2">
        ©{year} {name} · {email}
      </Typography>
    </Box>
  );
}
