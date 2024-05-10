import { SkeletonProps, TextFieldProps } from "@mui/material";
import {
  Control,
  ControllerProps,
  FieldValues,
  Path
} from "react-hook-form";

export type SelectFieldPropsT<T extends FieldValues> = Omit<
  TextFieldProps,
  "name" | "type" | "onChange"
> & {
  validation?: ControllerProps["rules"];
  name: Path<T>;
  options?: { id: string | number; item: string | number }[] | any[];
  valueKey?: string;
  labelKey?: string;
  type?: "string" | "number";
  objectOnChange?: boolean;
  onChange?: (value: any) => void;
  control?: Control<T>;
  isLoading?: boolean;
  skeletonProps?: SkeletonProps;
};