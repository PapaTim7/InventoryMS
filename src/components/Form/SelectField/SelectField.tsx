import { Box, MenuItem, Skeleton, TextField } from "@mui/material";
import { Controller, FieldValues } from "react-hook-form";
import { SelectFieldPropsT } from "./SelectField.types";

export function SelectField<TFieldValues extends FieldValues>({
  name,
  required,
  valueKey = "id",
  labelKey = "item",
  label,
  options = [],
  control,
  isLoading,
  skeletonProps,
  onChange: onChangeProps,
  ...rest
}: SelectFieldPropsT<TFieldValues>): JSX.Element {
  return isLoading ? (
    <Skeleton height={56} {...skeletonProps} />
  ) : (
    <Controller
      name={name}
      control={control}
      render={({
        field: { onBlur, onChange, value, ref },
        fieldState: { error },
      }) => (
        <TextField
          fullWidth
          name={name}
          select
          variant="standard"
          label={label}
          error={!!error}
          value={value ?? ""}
          InputLabelProps={{
            shrink: true,
          }}
          onBlur={onBlur}
          onChange={(event) => {
            onChange(event);
            onChangeProps?.(event);
          }}
          required={required}
          helperText={error?.message ?? " "}
          inputRef={ref}
          {...rest}
        >
          {options.map((option) => (
            <MenuItem
              key={option[valueKey]}
              value={option[valueKey]}
              disabled={option.disabled}
            >
              {option.icon ? (
                <Box component="span" sx={{ display: "flex" }}>
                  <Box
                    component="span"
                    sx={{
                      marginRight: 1,
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    {option.icon}
                  </Box>

                  {option[labelKey]}
                </Box>
              ) : (
                option[labelKey]
              )}
            </MenuItem>
          ))}
        </TextField>
      )}
    />
  );
}
