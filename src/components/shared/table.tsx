import {
  DataGrid,
  GridActionsCellItem,
  GridColDef,
  GridRowId,
  GridRowModel,
  GridRowModes
} from "@mui/x-data-grid";
import { useState } from "react";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import { Paper } from "@mui/material";
import { koKR } from "@mui/x-data-grid/locales";
import EnhancedToolbar from "./toolbar";
interface DataTableProps {
  title: string;
  onDelete: (v: readonly GridRowId[]) => void;
  onEdit: (v: any) => void;
  columns: GridColDef[];
  isLoading?: boolean;
  rows: GridRowModel[];
}
const DataTable = ({
  title,
  onEdit,
  onDelete,
  columns,
  isLoading,
  rows
}: DataTableProps) => {
  const [rowModesModel, setRowModesModel] = useState<GridRowModel>({});
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10
  });
  const [selected, setSelected] = useState<readonly GridRowId[]>([]);
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
  const handleProcessRowUpdate = (newRow: GridRowModel) => {
    const updatedRow = { ...newRow };
    onEdit(updatedRow);
    return updatedRow;
  };

  const handleDeleteClick = (id: GridRowId) => {
    onDelete([id]);
  };

  const actionsColumns: GridColDef[] = [
    ...columns,
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
              key={id}
              icon={<SaveIcon />}
              label="Save"
              onClick={() => handleSaveClick(id)}
              color="primary"
            />,
            <GridActionsCellItem
              key={id}
              icon={<CancelIcon />}
              label="Cancel"
              onClick={() => handleCancelClick(id)}
              color="inherit"
            />
          ];
        }

        return [
          <GridActionsCellItem
            key={id}
            icon={<EditIcon />}
            label="Edit"
            onClick={() => handleEditClick(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            key={id}
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
        title={title}
        numSelected={selected.length}
        onDelete={() => onDelete(selected)}
      />
      <DataGrid
        autoHeight={true}
        sx={{ border: 0, overflow: "auto", flex: 1 }}
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
        columns={actionsColumns}
        rows={rows}
        pageSizeOptions={[10, 20, 30]}
        editMode="row"
        rowModesModel={rowModesModel}
        onRowModesModelChange={(newModel) => setRowModesModel(newModel)}
        processRowUpdate={handleProcessRowUpdate}
      />
    </Paper>
  );
};

export default DataTable;
