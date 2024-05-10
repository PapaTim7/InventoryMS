import ClearRoundedIcon from "@mui/icons-material/ClearRounded";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import { ChangeEvent } from "react";
import { SearchInputPropsT } from "./SearchInput.types";

export function SearchInput({ onChangeText, ...props }: SearchInputPropsT) {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChangeText(event.target.value);
  };

  const handleClearText = () => {
    onChangeText("");
  };

  return (
    <TextField
      variant="standard"
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchRoundedIcon />
          </InputAdornment>
        ),
        endAdornment: (
          <IconButton
            sx={{ visibility: props.value ? "visible" : "hidden" }}
            size="small"
            onClick={handleClearText}
          >
            <ClearRoundedIcon />
          </IconButton>
        ),
      }}
      {...props}
      onChange={handleChange}
    />
  );
}
