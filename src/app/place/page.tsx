"use client";
import { PlaceForm } from "@/components/place/form";
import DataTable from "@/components/shared/table";
import { useModal } from "@/hooks/useModal";
import usePlace from "@/hooks/usePlace";
import { Button } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";

const PlacePage = () => {
  const { Modal, open, close } = useModal(false);
  const { place, isLoading, edit, remove } = usePlace();
  const columns: GridColDef[] = [
    { field: "id", headerName: "ID" },
    {
      field: "name",
      headerName: "현장명",
      flex: 1,
      editable: true
    },
    {
      field: "created_at",
      headerName: "추가한 날짜",
      type: "date",
      flex: 1,
      valueGetter: (value) => new Date(value)
    }
  ];
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
          <PlaceForm close={close} />
        </Modal>
      </div>
      <DataTable
        rows={place}
        columns={columns}
        title="현장 명단"
        onEdit={edit}
        onDelete={remove}
        isLoading={isLoading}
      />
    </div>
  );
};

export default PlacePage;
