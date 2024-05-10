import { TextField } from "@mui/material";
import { IInputFieldProps } from "./InputField.types";

export function InputField({
  registration,
  label,
  error,
  ...rest
}: IInputFieldProps) {
  return (
    <TextField
      fullWidth
      variant="standard"
      label={label}
      error={!!error}
      InputLabelProps={{
        shrink: true,
      }}
      helperText={error?.message ?? " "}
      {...registration}
      {...rest}
    />
  );
}
