"use client";

import { WorkerForm } from "@/components/worker/form";
import { WorkerList } from "@/components/worker/list";
import { useModal } from "@/hooks/useModal";
import { Button } from "@mui/material";

const WorkerPage = () => {
  const { Modal, open, close } = useModal(false);
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
      <WorkerList />
    </div>
  );
};

export default WorkerPage;
