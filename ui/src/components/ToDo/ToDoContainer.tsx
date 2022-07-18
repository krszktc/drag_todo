import { useDroppable } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { AddCircleOutline } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { observer } from "mobx-react-lite";
import { useContext } from "react";
import modalStore from "../../store/modal.store";
import ToDoItem from "./ToDoItem";

import './ToDoStyles.css';


interface ToDoContainerProps {
  id: string;
  placements: string[];
  canAddNew?: boolean;
}

const ToDoContainer = ({ id, placements, canAddNew }: ToDoContainerProps) => {
  const { setNodeRef } = useDroppable({ id });
  const { openModal } = useContext(modalStore);

  return (
    <div className='todo_container'>
      <div className='todo_container_title'>
        {id}
        {canAddNew &&
          <IconButton id='IconButton' color="success" onClick={() => openModal(id)}>
            <AddCircleOutline />
          </IconButton>
        }
      </div>
      <SortableContext
        id={id}
        items={placements}
        strategy={verticalListSortingStrategy}
      >
        <div ref={setNodeRef} className='todo_container_list'>
          {placements.map((plcId) => (
            <ToDoItem
              key={plcId}
              taskId={plcId}
              container={id}
            />
          ))}
        </div>
      </SortableContext>
    </div>
  );
}

export default observer(ToDoContainer);
