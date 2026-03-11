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
          gap: 3,
          alignItems: "center",
        }}
      >
        <Avatar
          src={lauraImg}
          alt="Laura Adán"
          sx={{
            width: 120,
            height: 120,
          }}
        />

        <Box>
          <Typography variant="h5" sx={{ fontWeight: 600 }}>
            Laura Adán
          </Typography>

          <Typography>
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
