import { Entity, Index, PrimaryKey, Property, types } from "@mikro-orm/core";
import cuid from "cuid";

@Entity({ tableName: 'placements' })
export class PlacementEntity {

  @PrimaryKey({hidden: true})
  id: string = cuid();

  @Property({hidden: true})
  @Index()
  projectId: string;

  @Property({ type: types.text })
  placement: string;

  constructor(projectId: string, placement: string) {
    this.projectId = projectId;
    this.placement = placement;
  }

}