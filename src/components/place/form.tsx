import { useForm } from "react-hook-form";
import { IoMdClose } from "react-icons/io";
import { Button } from "@mui/material";
import CustomInput from "../shared/input";
import { PlaceType } from "@/types/place";
import usePlace from "@/hooks/usePlace";
interface PlaceFormProps {
  close: () => void;
}
export const PlaceForm = ({ close }: PlaceFormProps) => {
  const { handleSubmit, control } = useForm<PlaceType>();
  const { mutate } = usePlace();
  const onSubmit = (data: PlaceType) => {
    mutate(data);
    close();
  };
  return (
    <form
      className="flex w-[25rem] flex-col gap-8"
      onSubmit={handleSubmit(onSubmit)}>
      <div className="flex justify-between">
        <span className="text-xl font-bold">현장 등록하기</span>
        <IoMdClose className="cursor-pointer" onClick={close} size="1.5rem" />
      </div>
      <div className="flex items-center gap-2">
        <CustomInput
          name="name"
          control={control}
          size="small"
          label="현장명"
          rules={{ required: "현장명은 필수 항목입니다." }}
        />
        <Button
          sx={{ whiteSpace: "nowrap", height: "fit-content" }}
          variant="contained"
          type="submit"
          color="primary">
          등록하기
        </Button>
      </div>
    </form>
  );
};
