import { Skeleton, Stack, TextField } from "@mui/material";
import { IInputFieldProps } from "./InputField.types";

export function InputField({
  registration,
  label,
  error,
  isLoading,
  skeletonProps,
  ...rest
}: IInputFieldProps) {
  return isLoading ? (
    <Skeleton height={56} {...skeletonProps} />
  ) : (
    <Stack>
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
    </Stack>
  );
}
