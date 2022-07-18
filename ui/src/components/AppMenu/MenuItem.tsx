import { ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { Link } from "react-router-dom";

interface MenuItemProps {
  text: string;
  icon: any;
  route: string;
  path?: string;
  pathParam?: string;
  disabled?: boolean;
}

export function MenuItem({ text, route, icon, disabled }: MenuItemProps) {
  return (
    <ListItem key={text} component={Link} to={route} disablePadding>
      <ListItemButton disabled={disabled}>
        <ListItemIcon>
          {icon}
        </ListItemIcon>
        <ListItemText primary={text} />
      </ListItemButton>
    </ListItem>
  )
}