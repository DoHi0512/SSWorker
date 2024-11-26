import { TextField } from "@mui/material";
import { useController } from "react-hook-form";

interface InputProps {
  control: any;
  name: string;
  label?: string;
  size?: "small" | "medium";
  rules?: object;
}

const CustomInput = ({
  control,
  name,
  label,
  rules,
  size = "medium"
}: InputProps) => {
  const {
    field,
    fieldState: { invalid, error }
  } = useController({
    name,
    control,
    rules,
    defaultValue: ""
  });

  return (
    <TextField
      {...field}
      inputRef={field.ref}
      label={label}
      size={size}
      error={invalid}
      helperText={error ? error.message : ""}
      fullWidth
    />
  );
};

export default CustomInput;
