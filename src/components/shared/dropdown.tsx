import { Autocomplete, TextField } from "@mui/material";
import { useController } from "react-hook-form";
interface CustomDropdownProps {
  options: string[];
  label: string;
  name: string;
  control: any;
  rules?: object;
}

const CustomDropdown = ({
  options,
  label,
  name,
  control,
  rules,
}: CustomDropdownProps) => {
  const {
    field,
    fieldState: { error, invalid },
  } = useController({
    name,
    control,
    defaultValue: "",
    rules,
  });
  return (
    <Autocomplete
      {...field}
      disablePortal
      options={options}
      onChange={(e, value) => field.onChange(value)}
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          error={invalid}
          helperText={error ? error.message : ""}
        />
      )}
    />
  );
};

export default CustomDropdown;
