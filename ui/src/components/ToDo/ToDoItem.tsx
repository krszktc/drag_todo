import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { CalendarMonth, Close } from "@mui/icons-material";
import { Card, CardContent, IconButton, Typography } from "@mui/material";
import { observer } from "mobx-react-lite";
import { useContext } from "react";
import { useTaskUtils } from "../../hooks/task.hook";
import modalStore from "../../store/modal.store";
import placementStore from "../../store/placement.store";
import taskStore from "../../store/task.store";

import './ToDoStyles.css';


interface ToDoItemProps {
  taskId: string;
  container?: string;
  isDraggable?: boolean;
}

const ToDoItem = ({ taskId, container, isDraggable }: ToDoItemProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition
  } = useSortable({ id: taskId });

  const { activeTaskId } = useContext(placementStore);
  const { openModal } = useContext(modalStore);
  const { tasks } = useContext(taskStore)
  const { deleteTask } = useTaskUtils()

  const task = tasks.get(taskId);

  const nodeStyles = {
    transform: transform || !isDraggable
      ? CSS.Transform.toString(transform)
      : 'translate3d(0, -10px, 0)',
    transition,
  };

  const onRemove = () => {
    if (taskId && container) {
      deleteTask(container, taskId)
    }
  }

  const onDetails = () => {
    openModal(container, task)
  }

  return (
    <div ref={setNodeRef} style={nodeStyles}>
      <Card className={!isDraggable && task?.id === activeTaskId ? 'todo_item_placeholder' : 'todo_item'}>
        <IconButton id='IconButton' size='small' disableRipple={true} onClick={onRemove}>
          <Close />
        </IconButton>
        <CardContent id='CardContent' {...attributes} {...listeners} onClick={onDetails}>
          <Typography variant="body1" component="div">
            {task?.name}
          </Typography>
          <Typography variant="body2" style={{ marginTop: 10 }}>
            <CalendarMonth fontSize="small" />
            <span>{task?.formattedDate}</span>
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
}

export default observer(ToDoItem);
