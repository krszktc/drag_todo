import { ArrowRight, IntegrationInstructions } from "@mui/icons-material";
import { Box, Drawer, List, Stack, Toolbar } from "@mui/material";
import { observer } from "mobx-react-lite";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { apiGetProjects } from "../../services/api.service";
import projectStore from "../../store/project.store";
import { MenuItem } from "./MenuItem";

const AppMenu = () => {
  const { projects, storeProject } = useContext(projectStore);
  const navigate = useNavigate();

  useEffect(() => {
    apiGetProjects()
      .then(({ data }) => {
        if (data.length) {
          storeProject(data);
          navigate(`/project/${data[0].id}`)
        }
      })
      .catch(_ => {
        toast.error("Can't get projects data");
      })
  }, []);

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 240,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { width: 240, boxSizing: 'border-box' },
      }}
    >
      <Toolbar />
      <Box sx={{ overflow: 'auto' }}>
        <Stack direction='row' spacing={1} style={{ marginLeft: 17, marginTop: 25 }}>
          <IntegrationInstructions color="action" fontSize="medium" />
          <p style={{ marginLeft: 30, fontSize: 18 }}>Projects</p>
        </Stack>
        <List>
          {projects.map(project =>
            <MenuItem
              key={project.id}
              text={project.name}
              route={`/project/${project.id}`}
              icon={<ArrowRight />}
            />
          )}
        </List>
      </Box>
    </Drawer>
  )
}

export default observer(AppMenu);