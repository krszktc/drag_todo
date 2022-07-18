import { AccountCircle } from "@mui/icons-material";
import { AppBar, Toolbar, Typography } from "@mui/material";
import './AppHeader.css';

export function AppHeader() {

  return (
    <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
      <Toolbar>
        <Typography variant="h6" noWrap component="div" align="right">
          <span className="app_header_content">
            <AccountCircle fontSize="large"/>
          </span>
        </Typography>
      </Toolbar>
    </AppBar>
  )
}