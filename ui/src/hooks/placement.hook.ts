import { useContext } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { PlacementState } from "../models/placement.model";
import { Task } from "../models/task.model";
import { apiGetPlacement, apiSavePlacement } from "../services/api.service";
import modalStore from "../store/modal.store";
import placementStore from "../store/placement.store";
import taskStore from "../store/task.store";


export function usePlacementUtils() {
  const { placement, storePlacement } = useContext(placementStore);
  const { storeCategories } = useContext(taskStore);
  const { containerName } = useContext(modalStore);
  const { projectId } = useParams();

  const _savePlacement = (newPlacement: PlacementState) => {
    if (projectId) {
      apiSavePlacement({ projectId, placement: JSON.stringify(newPlacement) })
        .catch(_ => toast.error(`Can't save placement for project: ${projectId}`))
      storePlacement(newPlacement);
    }
  }

  const _getPlacement = () => {
    if (projectId) {
      apiGetPlacement(projectId)
        .then(({ data }) => {
          if (data) {
            const newPlacement = JSON.parse(data.placement);
            const newCategories = Object.keys(newPlacement)
              .map((name: string, index: number) => ({ name, canAdd: index === 0 ? true : false }));
            storeCategories(newCategories);
            storePlacement(newPlacement);
          }
        })
        .catch(_ => toast.error(`Can't get placement for projectId: ${projectId}`))
    }
  }

  const _addPlacement = (task: Task) => {
    if (containerName && projectId) {
      const newContainer = [...placement[containerName]];
      newContainer.push(task.id);
      _savePlacement({
        ...placement,
        [containerName]: newContainer,
      });
    }
  }

  const _deletePlacement = (containerName: string, taskId: string) => {
    const newContainer = placement[containerName].filter(id => id !== taskId);
    _savePlacement({
      ...placement,
      [containerName]: newContainer,
    });
  }

  return {
    getPlacement: _getPlacement,
    addPlacement: _addPlacement,
    savePlacement: _savePlacement,
    deletePlacement: _deletePlacement,
  };
}
