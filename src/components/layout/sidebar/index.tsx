import { Box, Divider, List } from "@mui/material";
import { SidebarItem } from "./item";
import PersonIcon from "@mui/icons-material/Person";
import HomeIcon from "@mui/icons-material/Home";
import PlaceIcon from "@mui/icons-material/Place";
import ChecklistIcon from "@mui/icons-material/Checklist";
import DownloadIcon from "@mui/icons-material/Download";
export const Sidebar = () => {
  return (
    <div className="flex h-full w-56 shrink-0 flex-col gap-2 border-r border-gray-300 bg-white py-8">
      <Box>
        <List>
          <SidebarItem Icon={HomeIcon} label="홈" href="/" />
        </List>
        <Divider />
        <List>
          <SidebarItem Icon={PersonIcon} label="근로자 관리" href="/worker" />
          <SidebarItem Icon={PlaceIcon} label="현장 관리" href="/place" />
          <SidebarItem
            Icon={ChecklistIcon}
            label="데이터 관리"
            href="/management"
          />
        </List>
        <Divider />
        <List>
          <SidebarItem
            Icon={DownloadIcon}
            label="엑셀 다운로드"
            href="/download"
          />
        </List>
      </Box>
    </div>
  );
};
