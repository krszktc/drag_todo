import axios from "axios";
import { PlacementData, PlacementDto } from "../models/placement.model";
import { ProjectState } from "../models/project.model";
import { Task, TaskDto } from "../models/task.model";

// temporary security for demo purpose
const fakeUserName = 'TestLoginName';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8000',
  headers: {
    'x-fake-security-header': fakeUserName,
    'Content-Type': 'application/json',
  },
  timeout: 1000,
});


export const apiGetProjects = () => axiosInstance.get<ProjectState[]>('/project');

export const apiGetPlacement = (projectId: string) => axiosInstance.get<PlacementData>(`/placement/${projectId}`);

export const apiSavePlacement = (placement: PlacementDto) => axiosInstance.put('/placement', placement);

export const apiGetTasks = (projectId: string) => axiosInstance.get<Task[]>(`/task/${projectId}`);

export const apiCreateTask = (projectId: string, dto: TaskDto) => axiosInstance.post(`/task/${projectId}`, dto);

export const apiDeleteTask = (taskId: string) => axiosInstance.delete(`/task/${taskId}`);

export const apiUpdateTask = (dto: TaskDto) => axiosInstance.patch('/task', dto);
