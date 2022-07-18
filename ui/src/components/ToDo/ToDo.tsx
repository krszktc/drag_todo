import {
  closestCorners, DndContext,
  DragOverlay, KeyboardSensor, PointerSensor,
  useSensor,
  useSensors
} from "@dnd-kit/core";
import { arrayMove, sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import { observer } from "mobx-react-lite";
import { useContext, useEffect } from "react";
import ToDoContainer from "./ToDoContainer";
import ToDoItem from "./ToDoItem";
import ToDoModal from "./ToDoModal";
import placementStore from "../../store/placement.store";
import taskStore from "../../store/task.store";
import { useTaskUtils } from "../../hooks/task.hook";
import { usePlacementUtils } from "../../hooks/placement.hook";
import { useParams } from "react-router-dom";
import './ToDoStyles.css';


const ToDo = () => {
  const { placement, activeTaskId, storeActiveTaskId, storePlacement } = useContext(placementStore)
  const { getPlacement, savePlacement } = usePlacementUtils();
  const { categories } = useContext(taskStore);
  const { getTasks } = useTaskUtils();
  const { projectId } = useParams();

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 10,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates
    }),
  );

  const handleDragStart = (event: any) => {
    const { containerId, index } = event.active.data.current.sortable;
    storeActiveTaskId(placement[containerId][index]);
  }

  const handleDragOver = (event: any) => {
    const { containerId: activeContainerName, index: activeTaskIndex } =
      event.active.data.current.sortable;
    const { containerId: overContainerName, index: overTaskIndex } =
      event.over.data.current?.sortable || { containerId: event.over.id, index: 0 };

    if (activeContainerName && overContainerName && activeContainerName !== overContainerName) {
      const activeContainer = placement[activeContainerName];
      const overtContainer = placement[overContainerName];
      storePlacement({
        ...placement,
        [activeContainerName]: [
          ...activeContainer.filter(id => id !== activeTaskId)
        ],
        [overContainerName]: [
          ...overtContainer.slice(0, overTaskIndex),
          placement[activeContainerName][activeTaskIndex],
          ...overtContainer.slice(overTaskIndex, overtContainer.length)
        ]
      });
    }
  }

  const handleDragEnd = (event: any) => {
    const { containerId: activeContainerName, index: activeTaskIndex } = event.active.data.current.sortable;
    const { containerId: overContainerName, index: overTaskIndex } = event.over.data.current?.sortable || {};

    if (activeContainerName && overContainerName && activeContainerName === overContainerName) {
      savePlacement({
        ...placement,
        [overContainerName]: arrayMove(placement[overContainerName], activeTaskIndex, overTaskIndex)
      })
    }
    storeActiveTaskId(undefined);
  }

  useEffect(() => {
    getPlacement();
    getTasks();
  }, [projectId]);

  return (
    <>
      <div className='todo_wrapper'>
        <DndContext
          sensors={sensors}
          collisionDetection={closestCorners}
          onDragStart={handleDragStart}
          onDragOver={handleDragOver}
          onDragEnd={handleDragEnd}
        >
          {categories.map(cat =>
            <ToDoContainer
              id={cat.name}
              key={cat.name}
              canAddNew={cat.canAdd}
              placements={placement[cat.name] || []}
            />
          )}
          <DragOverlay>
            {activeTaskId
              ? <ToDoItem taskId={activeTaskId} isDraggable />
              : null
            }
          </DragOverlay>
        </DndContext>
      </div>
      <ToDoModal />
    </>
  );
}

export default observer(ToDo);
