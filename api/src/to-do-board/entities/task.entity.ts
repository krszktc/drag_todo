import { Entity, ManyToOne, PrimaryKey, Property } from "@mikro-orm/core";
import { TaskDto } from "../models/task.model";
import { ProjectEntity } from "./project.entity";

@Entity({ tableName: 'tasks' })
export class TaskEntity {

  @PrimaryKey()
  id: string;

  @Property()
  name: string;

  @Property({ defaultRaw: 'now()' })
  createdAt: Date = new Date();

  @Property({ nullable: true })
  description?: string;

  @Property({ nullable: true })
  dueDate?: Date;

  @ManyToOne({ entity: () => ProjectEntity })
  project: ProjectEntity;

  constructor(id: string, name: string) {
    this.id = id;
    this.name = name;
  }

  static fromDto(project: ProjectEntity, dto: TaskDto): TaskEntity {
    const task = new TaskEntity(dto.id, dto.name);
    task.description = dto.description;
    task.dueDate = dto.dueDate;
    task.project = project;
    return task;
  }

}