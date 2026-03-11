import { IconButton, Tooltip } from "@mui/material";
import ShareIcon from "@mui/icons-material/Share";
import { useState } from "react";

export default function SharePost() {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    await navigator.clipboard.writeText(window.location.href);
    setCopied(true);

    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Tooltip title={copied ? "Enlace copiado" : "Compartir"}>
      <IconButton
        size="small"
        onClick={handleShare}
        sx={{
          color: "#777",
          "&:hover": {
            color: "#000",
            backgroundColor: "transparent",
          },
        }}
      >
        <ShareIcon fontSize="small" />
      </IconButton>
    </Tooltip>
  );
}
