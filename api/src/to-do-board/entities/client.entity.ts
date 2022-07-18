import { Collection, Entity, OneToMany, PrimaryKey, Property } from "@mikro-orm/core";
import cuid from "cuid";
import { ProjectEntity } from "./project.entity";

@Entity({ tableName: 'clients' })
export class ClientEntity {

  @PrimaryKey()
  id: string = cuid();

  @Property()
  loginName: string;

  @OneToMany(() => ProjectEntity, (project) => project.client)
  projects = new Collection<ProjectEntity>(this);

  constructor(loginName: string) {
   this.loginName = loginName;
  }

}