import { action, makeObservable, observable } from "mobx";
import { createContext } from "react";
import { PlacementState } from "../models/placement.model";


class PlacementStore {

  @observable
  placement: PlacementState = {};

  @observable
  activeTaskId?: string;

  constructor() {
    makeObservable(this);
  }

  @action
  storePlacement = (placement: PlacementState) => {
    this.placement = placement
  }

  @action
  storeActiveTaskId = (taskId?: string) => {
    this.activeTaskId = taskId;
  }

}

export default createContext(new PlacementStore())