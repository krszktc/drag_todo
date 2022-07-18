import { Collection, Entity, ManyToOne, OneToMany, PrimaryKey, Property } from "@mikro-orm/core";
import cuid from "cuid";
import { ClientEntity } from "./client.entity";
import { TaskEntity } from "./task.entity";

@Entity({ tableName: 'projects' })
export class ProjectEntity {

  @PrimaryKey()
  id: string = cuid();

  @Property()
  name: string;

  @ManyToOne({ entity: () => ClientEntity })
  client: ClientEntity;

  @OneToMany(() => TaskEntity, (task) => task.project)
  tasks = new Collection<TaskEntity>(this);

  constructor(name: string, client: ClientEntity) {
    this.name = name;
    this.client = client;
  }

}