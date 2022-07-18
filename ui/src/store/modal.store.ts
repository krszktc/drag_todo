import { action, makeObservable, observable } from "mobx";
import { createContext } from "react";
import { Task } from "../models/task.model";


class ModalStore {

  @observable
  task?: Task;

  @observable
  containerName?: string;

  @observable
  isModalOpened: boolean = false;

  constructor() {
    makeObservable(this);
  }

  @action
  openModal = (containerName?: string, task?: Task) => {
    this.isModalOpened = true;
    this.containerName = containerName;
    this.task = task;
  }

  @action
  closeModal = () => {
    this.isModalOpened = false;
    this.containerName = undefined;
    this.task = undefined;
  }

}

export default createContext(new ModalStore())