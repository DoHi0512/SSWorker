import { useController } from "react-hook-form";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import "dayjs/locale/ko";
interface DatePickerProps {
  control: any;
  name: string;
  label?: string;
  rules?: object;
}

const CustomDatePicker = ({ control, name, label, rules }: DatePickerProps) => {
  const { field } = useController({
    name,
    control,
    rules,
    defaultValue: new Date()
  });

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ko">
      <DatePicker
        defaultValue={dayjs()}
        {...field}
        value={field.value ? dayjs(field.value) : null}
        inputRef={field.ref}
        label={label}
      />
    </LocalizationProvider>
  );
};

export default CustomDatePicker;
