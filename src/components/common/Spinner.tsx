import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

interface Props {
  size?: number;
  height?: string;
}

export default function Spinner({ size = 50, height = "60vh" }: Props) {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height,
      }}
    >
      <CircularProgress size={size} />
    </Box>
  );
}
