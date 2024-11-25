"use client";
import useWorker from "@/hooks/useWorker";
import { DataGrid, GridRowId } from "@mui/x-data-grid";
import { koKR } from "@mui/x-data-grid/locales";
import { useState } from "react";
import EnhancedToolbar from "../shared/toolbar";
import { Paper } from "@mui/material";
export const WorkerList = () => {
  const [selected, setSelected] = useState<readonly GridRowId[]>([]);
  const { worker, isLoading } = useWorker();
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10
  });
  const columns = [
    { field: "name", width: 150, headerName: "이름" },
    { field: "register_number", headerName: "주민번호", flex: 1 },
    { field: "phone_number", headerName: "전화번호", flex: 1 },
    {
      field: "account_number",
      headerName: "계좌번호",
      flex: 1
    },
    {
      field: "address",
      headerName: "주소",
      width: 150
    },
    {
      field: "pay",
      width: 150,
      headerName: "단가"
    },
    {
      field: "bank",
      width: 150,
      headerName: "은행"
    },

    {
      field: "depositor",
      width: 150,
      headerName: "예금주"
    }
  ];

  return (
    <Paper className="flex flex-1 flex-col">
      <EnhancedToolbar
        title="근로자 명단"
        numSelected={selected.length}
        onDelete={() => console.log(selected)}
      />
      <DataGrid
        sx={{ border: 0 }}
        slotProps={{
          loadingOverlay: {
            variant: "skeleton",
            noRowsVariant: "skeleton"
          }
        }}
        loading={isLoading}
        onPaginationModelChange={setPaginationModel}
        checkboxSelection
        onRowSelectionModelChange={(newSelection) => {
          setSelected(newSelection);
        }}
        localeText={koKR.components.MuiDataGrid.defaultProps.localeText}
        initialState={{ pagination: { paginationModel } }}
        columns={columns}
        rows={worker || []}
        pageSizeOptions={[10, 20, 30]}
      />
    </Paper>
  );
};
