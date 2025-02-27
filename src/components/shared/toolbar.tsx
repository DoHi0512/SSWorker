import { alpha, IconButton, Toolbar, Tooltip } from "@mui/material";
import { GridDeleteIcon } from "@mui/x-data-grid";

interface EnhancedToolbarProps {
  numSelected: number;
  onDelete: () => void;
  title: string;
}
const EnhancedToolbar = ({
  numSelected,
  onDelete,

  title
}: EnhancedToolbarProps) => {
  return (
    <Toolbar
      sx={[
        {
          pl: { sm: 2 },
          pr: { xs: 1, sm: 1 }
        },
        numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            )
        }
      ]}>
      {numSelected > 0 ? (
        <span className="flex-1 text-lg font-semibold">
          {numSelected}개 선택됨
        </span>
      ) : (
        <span className="text-xl font-semibold">{title}</span>
      )}
      {numSelected > 0 && (
        <Tooltip title="삭제하기">
          <IconButton onClick={onDelete}>
            <GridDeleteIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
};

export default EnhancedToolbar;
