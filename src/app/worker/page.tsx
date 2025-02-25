"use client";
import InputForm from "@/components/shared/form";
import DataTable from "@/components/shared/table";
import { WORKER_COLUMN } from "@/constants/columns";
import { WORKER_FORM } from "@/constants/form";
import { useModal } from "@/hooks/useModal";
import useWorker from "@/hooks/useWorker";
import { Button } from "@mui/material";

const WorkerPage = () => {
  const { Modal, open, close } = useModal(false);
  const { worker, isLoading, remove, edit, mutate } = useWorker();
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
            list={WORKER_FORM}
            gridCols={2}
            title="근로자 등록"
          />
        </Modal>
      </div>
      <DataTable
        rows={worker || []}
        columns={WORKER_COLUMN}
        title="근로자 명단"
        onEdit={edit}
        onDelete={remove}
        isLoading={isLoading}
      />
    </div>
  );
};

export default WorkerPage;
