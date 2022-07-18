
export interface PlacementData {
  placement: string;
}

export interface PlacementState {
  [key: string]: string[];
}

export interface CategoryState {
  name: string;
  canAdd: boolean;
}

export interface PlacementDto {
  projectId: string;
  placement: string;
}