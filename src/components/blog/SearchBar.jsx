import { TextField, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

export default function SearchBar({ onSearch }) {
  return (
    <TextField
      fullWidth
      placeholder="Buscar artículos..."
      sx={{ mb: 4 }}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        ),
      }}
      onChange={(e) => onSearch(e.target.value)}
    />
  );
}
