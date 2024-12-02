"use client";
import InputForm from "@/components/shared/form";
import DataTable from "@/components/shared/table";
import { MANAGEMENT_COLUMN } from "@/constants/columns";
import useManagement from "@/hooks/useManagement";
import { useModal } from "@/hooks/useModal";
import usePlace from "@/hooks/usePlace";
import useWorker from "@/hooks/useWorker";
import { FormListType } from "@/types/shared";
import { Button } from "@mui/material";

const ManagementPage = () => {
  const { worker } = useWorker();
  const { place } = usePlace();
  const { management, mutate, isLoading, edit, remove } = useManagement();
  const { open, close, Modal } = useModal();
  const MANAGEMENT_FORM: FormListType[] = [
    {
      type: "datepicker",
      name: "date",
      label: "날짜",
      rules: { required: "날짜는 필수 항목입니다." }
    },

    {
      type: "dropdown",
      options: worker?.map(({ name }) => name),
      label: "근로자명",
      name: "name",
      rules: { required: "근로자명은 필수 항목입니다." }
    },
    {
      type: "dropdown",
      options: place?.map(({ name }) => name),
      label: "현장명",
      name: "place",
      rules: { required: "현장명은 필수 항목입니다." }
    },
    {
      type: "input",
      label: "공수",
      name: "time",
      rules: {
        required: "공수는 필수 항목입니다.",
        pattern: { value: /^[0-9]+$/, message: "숫자만 입력 가능합니다." }
      }
    }
  ];

  return (
    <div className="flex h-full flex-col gap-4">
      <div className="flex items-center justify-between">
        <span className="text-2xl font-semibold">근로자 관리</span>
        <Button
          size="large"
          variant="contained"
          className="bg-primary text-white"
          onClick={open}>
          추가하기
        </Button>
        <Modal>
          <InputForm
            close={close}
            mutate={mutate}
            list={MANAGEMENT_FORM}
            gridCols={2}
            title="근로자 등록"
          />
        </Modal>
      </div>
      <DataTable
        rows={management}
        columns={MANAGEMENT_COLUMN}
        title="근로자 명단"
        onEdit={edit}
        onDelete={remove}
        isLoading={isLoading}
      />
    </div>
  );
};

export default ManagementPage;
