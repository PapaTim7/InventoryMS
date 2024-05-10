
import {
  OutlinedTextFieldProps,
  SkeletonProps,
} from "@mui/material";
import { FieldError, UseFormRegisterReturn } from "react-hook-form";

export interface IInputFieldProps extends Omit<OutlinedTextFieldProps, "error" | "variant"> {
  label: string;
  error: FieldError | undefined;
  registration: Partial<UseFormRegisterReturn>;
  isLoading?: boolean;
  skeletonProps?: SkeletonProps;
}