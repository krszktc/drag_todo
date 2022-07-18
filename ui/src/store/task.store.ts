import { action, makeObservable, observable } from "mobx";
import { createContext } from "react";
import { CategoryState } from "../models/placement.model";
import { Task } from "../models/task.model";


class TaskStore {

  @observable
  tasks: Map<string, Task> = new Map();

  @observable
  categories: CategoryState[] = [];

  constructor() {
    makeObservable(this);
  }

  @action
  storeTask = (state: Map<string, Task>) => {
    this.tasks = state;
  }

  @action
  storeCategories = (categories: CategoryState[]) => {
    this.categories = categories;
  }

  @action
  updateTask = (task: Task,) => {
    const newState = new Map(this.tasks);
    newState.set(task.id, Task.clone(task));
    this.tasks = newState;
  }

  @action
  createTask = (task: Task) => {
    this.tasks.set(task.id, task);
  }

  @action
  deleteTask = (taskId: string) => {
    this.tasks.delete(taskId);
  }

}

export default createContext(new TaskStore())