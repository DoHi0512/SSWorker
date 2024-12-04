"use client";
import InputForm from "@/components/shared/form";
import DataTable from "@/components/shared/table";
import { PLACE_COLUMN } from "@/constants/columns";
import { PLACE_FORM } from "@/constants/form";
import { useModal } from "@/hooks/useModal";
import usePlace from "@/hooks/usePlace";
import { Button } from "@mui/material";

const PlacePage = () => {
  const { Modal, open, close } = useModal(false);
  const { place, isLoading, edit, remove, mutate } = usePlace();
  return (
    <div className="flex h-full flex-col gap-4">
      <div className="flex items-center justify-between">
        <span className="text-2xl font-semibold">현장 관리</span>
        <Button
          size="large"
          variant="contained"
          className="bg-primary text-white"
          onClick={open}>
          추가하기
        </Button>
        <Modal>
          <InputForm
            list={PLACE_FORM}
            mutate={mutate}
            close={close}
            title="현장 등록"
            gridCols={1}
          />
        </Modal>
      </div>
      <DataTable
        rows={place}
        columns={PLACE_COLUMN}
        title="현장 목록"
        onEdit={edit}
        onDelete={remove}
        isLoading={isLoading}
      />
    </div>
  );
};

export default PlacePage;
