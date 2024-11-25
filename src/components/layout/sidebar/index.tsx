import { Box, Divider, List } from "@mui/material";
import { SidebarItem } from "./item";
import PersonIcon from "@mui/icons-material/Person";
import HomeIcon from "@mui/icons-material/Home";

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
        </List>
      </Box>
    </div>
  );
};
