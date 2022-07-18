import { Close } from "@mui/icons-material";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, IconButton, Stack, TextField } from "@mui/material";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import cuid from "cuid";
import { observer } from "mobx-react-lite";
import { useContext, useEffect, useState } from "react";
import { useTaskUtils } from "../../hooks/task.hook";
import { Task } from "../../models/task.model";
import modalStore from "../../store/modal.store";

export interface DialogProps {
  onClose: () => void;
  children?: React.ReactNode;
}

const BootstrapDialogTitle = ({ onClose, children }: DialogProps) => {
  return (
    <DialogTitle sx={{ m: 0, p: 2 }}>
      <span style={{ marginLeft: 10 }}>
        {children}
      </span>
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <Close />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

const ToDoModal = () => {
  const [date, setDate] = useState<Date | null>(null)
  const [name, setName] = useState<string | undefined>(undefined)
  const [description, setDescription] = useState<string | undefined>(undefined)

  const { updateTask, createTask } = useTaskUtils();
  const { task, isModalOpened, containerName, closeModal } = useContext(modalStore);

  const onNameChange = (event: any) => {
    setName(event.target.value);
  }

  const onDescriptionChange = (event: any) => {
    setDescription(event.target.value);
  }

  const onDateChange = (date: Date | null) => {
    setDate(date);
  }

  const clearDate = () => {
    setDate(null);
  }

  const onSave = () => {
    if (name && containerName) {
      const taskDate = date ? date : undefined;
      if (task) {
        updateTask(new Task(task.id, name, description, taskDate));
      } else {
        createTask(new Task(cuid(), name, description, taskDate));
      }
      closeModal();
    }
  }

  const onDialogClose = () => {
    closeModal()
  }

  useEffect(() => {
    setDate(task?.dueDate ? task.dueDate : null);
    setDescription(task?.description)
    setName(task?.name);
  }, [task, isModalOpened])

  return (
    <Dialog onClose={onDialogClose} open={isModalOpened}>
      <BootstrapDialogTitle onClose={onDialogClose}>
        Task Info
      </BootstrapDialogTitle>
      <DialogContent dividers>
        <Grid container spacing={2}>
          <Grid item xs={7}>
            <TextField
              style={{ width: '100%' }}
              label="Name"
              variant="outlined"
              multiline={true}
              rows={3}
              value={name}
              onChange={onNameChange}
            />
          </Grid>
          <Grid item xs={5}>
            <Stack spacing={1}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DesktopDatePicker
                  disablePast
                  value={date}
                  label="Due date"
                  inputFormat="MM/dd/yyyy"
                  onChange={onDateChange}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
              <Button variant="outlined" onClick={clearDate}>
                Clear
              </Button>
            </Stack>
          </Grid>
        </Grid>
        <TextField
          style={{ width: '100%', marginTop: 25 }}
          label="Description"
          multiline
          rows={6}
          value={description}
          onChange={onDescriptionChange}
        />
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={onSave} disabled={!name}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default observer(ToDoModal);