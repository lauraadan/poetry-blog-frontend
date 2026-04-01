import { Card, CardContent, Avatar, Typography, Box } from "@mui/material";
import lauraImg from "../../assets/laura.jpg";

export default function AvatarBio() {
  return (
    <Card
      sx={{
        mb: 5,
        boxShadow: 0,
        borderRadius: 2,
        border: "1px solid #eaeaea",
      }}
    >
      <CardContent
        sx={{
          display: "flex",
          gap: { xs: 2, md: 3 },
          alignItems: "center",
          flexDirection: { xs: "column", sm: "row" },
          textAlign: { xs: "center", sm: "left" },
        }}
      >
        {/* AVATAR */}
        <Avatar
          src={lauraImg}
          alt="Laura Adán"
          sx={{
            width: 120,
            height: 120,
            display: { xs: "none", sm: "block" },
          }}
        />

        {/* TEXTO */}
        <Box>
          <Typography
            sx={{
              fontSize: { xs: "1.3rem", md: "1.6rem" },
              fontWeight: 600,
              mb: 1,
            }}
          >
            Laura Adán
          </Typography>

          <Typography
            sx={{
              fontSize: { xs: "0.95rem", md: "1rem" },
              lineHeight: 1.7,
              color: "#555",
            }}
          >
            Nacida en Tarragona en 1991 y residente en Barcelona desde hace
            años, Laura ha construido su vida entre dos ámbitos aparentemente
            opuestos: la lógica y la emoción. Desarrolladora de software de
            profesión, encuentra en la escritura el espacio donde todo aquello
            que no cabe en el código puede existir sin reglas.
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}
