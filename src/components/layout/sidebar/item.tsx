"use client";
import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  SvgIconTypeMap
} from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface SidebarItemProps {
  href: string;
  label: string;
  Icon: OverridableComponent<SvgIconTypeMap<{}, "svg">>;
}
export const SidebarItem = ({ href, label, Icon }: SidebarItemProps) => {
  const isActive = usePathname() === href;
  return (
    <ListItem disablePadding href={href} component={Link}>
      <ListItemButton selected={isActive}>
        <ListItemIcon>
          <Icon />
        </ListItemIcon>
        <span className="text-lg font-medium">{label}</span>
      </ListItemButton>
    </ListItem>
  );
};
