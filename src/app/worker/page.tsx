"use client";

import DataTable from "@/components/shared/table";
import { WorkerForm } from "@/components/worker/form";
import { useModal } from "@/hooks/useModal";
import useWorker from "@/hooks/useWorker";
import { Button } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";

const WorkerPage = () => {
  const { Modal, open, close } = useModal(false);
  const { worker, isLoading, remove, edit } = useWorker();
  const columns: GridColDef[] = [
    { field: "name", headerName: "이름", editable: true },
    {
      field: "register_number",
      headerName: "주민번호",
      flex: 1,
      editable: true
    },
    { field: "phone_number", headerName: "전화번호", flex: 1, editable: true },
    {
      field: "account_number",
      headerName: "계좌번호",
      flex: 1,
      editable: true
    },
    { field: "address", headerName: "주소", editable: true },
    { field: "pay", headerName: "단가", editable: true },
    { field: "bank", headerName: "은행", editable: true },
    { field: "depositor", headerName: "예금주", editable: true }
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
          <WorkerForm close={close} />
        </Modal>
      </div>
      <DataTable
        rows={worker}
        columns={columns}
        title="근로자 명단"
        onEdit={edit}
        onDelete={remove}
        isLoading={isLoading}
      />
    </div>
  );
};

export default WorkerPage;
