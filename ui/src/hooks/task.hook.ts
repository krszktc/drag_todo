import { useContext } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Task, TaskDto } from "../models/task.model";
import { apiCreateTask, apiDeleteTask, apiGetTasks, apiUpdateTask } from "../services/api.service";
import taskStore from "../store/task.store";
import { usePlacementUtils } from "./placement.hook";


export function useTaskUtils() {
  const { storeTask, updateTask, createTask, deleteTask } = useContext(taskStore);
  const { addPlacement, deletePlacement } = usePlacementUtils();
  const { projectId } = useParams();

  const _getTasks = () => {
    if (projectId) {
      apiGetTasks(projectId)
        .then(({ data }) => {
          const tasks = new Map<string, Task>();
          data.forEach(task => {
            tasks.set(task.id, Task.clone(task));
          })
          storeTask(tasks);
        })
        .catch(_ => toast.error(`Cant't get tasks for projectId: ${projectId}`))
    }
  }

  const _updateTask = (task: Task) => {
    apiUpdateTask(task as TaskDto)
      .catch(_ => toast.error(`Can't update task ${task.id}`));
    updateTask(task);
  }

  const _createTask = (task: Task) => {
    if (projectId) {
      apiCreateTask(projectId, task as TaskDto)
        .catch(_ => toast.error(`Cant't add task to project ${projectId}`));
      createTask(task);
      addPlacement(task);
    }
  }

  const _deleteTask = (containerName: string, taskId: string) => {
    apiDeleteTask(taskId)
      .catch(_ => `Can't remove task ${taskId}`);
    deleteTask(taskId);
    deletePlacement(containerName, taskId);
  }

  return {
    getTasks: _getTasks,
    updateTask: _updateTask,
    createTask: _createTask,
    deleteTask: _deleteTask,
  };
}
