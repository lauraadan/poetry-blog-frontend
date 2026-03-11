import { IconButton } from "@mui/material";
import InstagramIcon from "@mui/icons-material/Instagram";

export default function SocialLinks() {
  return (
    <IconButton
      component="a"
      href="https://www.instagram.com/lauraadan__"
      target="_blank"
      rel="noopener noreferrer"
      color="inherit"
    >
      <InstagramIcon />
    </IconButton>
  );
}
