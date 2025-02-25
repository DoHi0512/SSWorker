"use client";
import CustomDatePicker from "@/components/shared/datepicker";
import { Button } from "@mui/material";
import { useForm } from "react-hook-form";
import createLaborStatement from "../../utils/excel/laborStatement";

// Form 데이터 타입 정의
interface FormData {
  selectedDate: string;
}

const DownloadPage: React.FC = () => {
  const { control, handleSubmit } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    createLaborStatement(data.selectedDate.toString());
  };

  return (
    <div className="flex h-full flex-col gap-4">
      <div className="flex items-center justify-between">
        <span className="text-2xl font-semibold">엑셀 다운로드</span>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex justify-between rounded-sm bg-white p-4">
        <div className="flex gap-2">
          <CustomDatePicker
            name="selectedDate"
            control={control}
            label="시작 날짜"
          />
        </div>
        <Button size="large" variant="contained" type="submit" color="primary">
          다운로드
        </Button>
      </form>
    </div>
  );
};

export default DownloadPage;
