"use client";
import useWorker from "@/hooks/useWorker";
import {
  DataGrid,
  GridActionsCellItem,
  GridColDef,
  GridRowId,
  GridRowModes,
  GridRowModesModel
} from "@mui/x-data-grid";
import { koKR } from "@mui/x-data-grid/locales";
import { useState } from "react";
import EnhancedToolbar from "../shared/toolbar";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import { Paper } from "@mui/material";
import { WorkerTypes } from "@/types/worker";

export const WorkerList = () => {
  const [selected, setSelected] = useState<readonly GridRowId[]>([]);
  const { worker, isLoading, remove, edit } = useWorker();
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10
  });
  const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({});

  const handleEditClick = (id: GridRowId) => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.Edit }
    });
  };

  const handleSaveClick = (id: GridRowId) => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View }
    });
  };

  const handleCancelClick = (id: GridRowId) => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true }
    });
  };

  const handleProcessRowUpdate = (newRow: WorkerTypes) => {
    const updatedRow = { ...newRow };
    edit(updatedRow);
    return updatedRow;
  };

  const handleDeleteClick = (id: GridRowId) => {
    remove([id]);
  };

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
    { field: "depositor", headerName: "예금주", editable: true },
    {
      field: "actions",
      type: "actions",
      headerName: "작업",
      width: 100,
      getActions: ({ id }: { id: GridRowId }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<SaveIcon />}
              label="Save"
              onClick={() => handleSaveClick(id)}
              color="primary"
            />,
            <GridActionsCellItem
              icon={<CancelIcon />}
              label="Cancel"
              onClick={() => handleCancelClick(id)}
              color="inherit"
            />
          ];
        }

        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            onClick={() => handleEditClick(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={() => handleDeleteClick(id)}
            color="inherit"
          />
        ];
      }
    }
  ];

  return (
    <Paper className="flex flex-1 flex-col">
      <EnhancedToolbar
        title="근로자 명단"
        numSelected={selected.length}
        onDelete={() => remove(selected)} // 선택된 항목 삭제
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
        editMode="row"
        rowModesModel={rowModesModel}
        onRowModesModelChange={(newModel) => setRowModesModel(newModel)}
        processRowUpdate={handleProcessRowUpdate}
      />
    </Paper>
  );
};
