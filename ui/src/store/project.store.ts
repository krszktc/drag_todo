import { action, computed, makeObservable, observable } from "mobx";
import { createContext } from "react";
import { ProjectState } from "../models/project.model";


class ProjectStore {

  @observable
  projects: ProjectState[] = [];

  constructor() {
    makeObservable(this);
  }

  @action
  storeProject = (projects: ProjectState[]) => {
    this.projects = projects;
  }
}

export default createContext(new ProjectStore())