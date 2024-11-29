import { Button, TextFieldProps } from "@mui/material";
import CustomDropdown from "./dropdown";
import { useForm } from "react-hook-form";
import CustomInput from "./input";
import { IoMdClose } from "react-icons/io";
import { FormListType } from "@/types/shared";

interface InputFormProps {
  close: () => void;
  list: FormListType[];
  mutate: (v: any) => void;
  title: string;
  gridCols: number;
}

const InputForm = ({
  close,
  list,
  mutate,
  title,
  gridCols
}: InputFormProps) => {
  const { handleSubmit, control } = useForm<any>();
  const InputList = list.map(({ type, options, ...props }, key) => {
    if (type == "dropdown" && options) {
      return (
        <CustomDropdown
          key={key}
          options={options}
          control={control}
          {...props}
        />
      );
    } else if (type == "input") {
      return <CustomInput key={key} {...props} control={control} />;
    }
  });

  const onSubmit = (data: any) => {
    mutate(data);
    close();
  };

  const gridStyle: Record<number, string> = {
    1: "grid-cols-1",
    2: "grid-cols-2"
  };

  return (
    <form className="flex flex-col gap-8" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex justify-between">
        <span className="text-xl font-bold">{title}</span>
        <IoMdClose className="cursor-pointer" onClick={close} size="1.5rem" />
      </div>
      <div className={`${gridStyle[gridCols]} grid grid-cols-2 gap-4`}>
        {InputList}
      </div>
      <Button size="large" variant="contained" type="submit" color="primary">
        등록하기
      </Button>
    </form>
  );
};

export default InputForm;
