import { GridColDef } from "@mui/x-data-grid";

export const WORKER_COLUMN: GridColDef[] = [
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

export const PLACE_COLUMN: GridColDef[] = [
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
