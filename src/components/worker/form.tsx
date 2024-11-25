import { useForm } from "react-hook-form";
import useWorker from "@/hooks/useWorker";
import { WorkerTypes } from "@/types/worker";
import { IoMdClose } from "react-icons/io";
import { Autocomplete, Button, TextField } from "@mui/material";
import CustomInput from "../shared/input";
import CustomDropdown from "../shared/dropdown";
interface WorkerFormProps {
  close: () => void;
}
export const WorkerForm = ({ close }: WorkerFormProps) => {
  const { handleSubmit, control } = useForm<WorkerTypes>();
  const { mutate } = useWorker();
  const onSubmit = (data: WorkerTypes) => {
    mutate(data);
    close();
  };
  return (
    <form
      className="flex w-[50rem] flex-col gap-8"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex justify-between">
        <span className="text-xl font-bold">근로자 등록하기</span>
        <IoMdClose className="cursor-pointer" onClick={close} size="1.5rem" />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <CustomInput
          name="name"
          control={control}
          label="이름"
          rules={{ required: "이름은 필수 항목입니다." }}
        />

        <CustomInput
          name="register_number"
          control={control}
          label="주민번호"
          rules={{
            required: "주민번호는 필수 항목입니다.",
            pattern: {
              value: /^\d{6}[-]?\d{7}$/,
              message: "유효한 주민번호를 입력해주세요.",
            },
          }}
        />
        <CustomInput
          name="phone_number"
          control={control}
          label="전화번호"
          rules={{
            required: "전화번호는 필수 항목입니다.",
            pattern: {
              value: /^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/,
              message: "유효한 전화번호를 입력해주세요.",
            },
          }}
        />
        <CustomInput
          name="pay"
          control={control}
          label="단가"
          rules={{
            required: "단가는 필수 항목입니다.",
            pattern: { value: /^[0-9]+$/, message: "숫자만 입력 가능합니다." },
          }}
        />
        <CustomInput
          name="address"
          control={control}
          label="주소"
          rules={{ required: "주소는 필수 항목입니다." }}
        />
        <CustomDropdown
          name="bank"
          control={control}
          options={["신한은행", "국민은행", "카카오뱅크"]}
          label="은행"
          rules={{ required: "은행은 필수 항목입니다." }}
        />

        <CustomInput
          name="account_number"
          control={control}
          label="계좌번호"
          rules={{
            required: "계좌번호는 필수 항목입니다.",
            pattern: { value: /^[0-9]+$/, message: "숫자만 입력 가능합니다." },
          }}
        />
        <CustomInput
          name="depositor"
          control={control}
          label="예금주"
          rules={{ required: "예금주는 필수 항목입니다." }}
        />
      </div>
      <Button size="large" variant="contained" type="submit" color="primary">
        등록하기
      </Button>
    </form>
  );
};
