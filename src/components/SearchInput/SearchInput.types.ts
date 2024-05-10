import {
  TextFieldProps
} from '@mui/material'

export type SearchInputPropsT = TextFieldProps & {
  onChangeText: (value: string) => void
}