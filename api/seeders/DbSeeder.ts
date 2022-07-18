import type { EntityManager } from '@mikro-orm/core';
import { Seeder } from '@mikro-orm/seeder';
import cuid from 'cuid';
import { PlacementEntity } from '../src/to-do-board/entities/placement.entity';
import { ClientEntity } from '../src/to-do-board/entities/client.entity';
import { ProjectEntity } from '../src/to-do-board/entities/project.entity';
import { TaskEntity } from '../src/to-do-board/entities/task.entity';

export class DbSeeder extends Seeder {

  async run(em: EntityManager): Promise<void> {
    const ids = [cuid(), cuid(), cuid(), cuid(), cuid(), cuid(), cuid(),
    cuid(), cuid(), cuid(), cuid(), cuid(), cuid(), cuid()];

    const client = new ClientEntity('TestLoginName');
    em.persist(client);

    const projectA = new ProjectEntity('Some Project', client);
    const projectB = new ProjectEntity('Other Project', client);
    em.persist([projectA, projectB]);

    const task0 = new TaskEntity(ids[0], 'Need to make it asap');
    task0.project = projectA;
    const task1 = new TaskEntity(ids[1], 'Make something');
    task1.description = 'I need to make it quickly';
    task1.project = projectA;
    const task2 = new TaskEntity(ids[2], 'Make something other');
    task2.description = 'This other thing is much more interesting';
    task2.dueDate = new Date('2022-05-10');
    task2.project = projectA;
    const task3 = new TaskEntity(ids[3], 'Some task');
    task3.description = 'Boring description for boring task'
    task3.project = projectA;
    const task4 = new TaskEntity(ids[4], 'Other task');
    task4.dueDate = new Date('2022-06-15');
    task4.project = projectA;
    const task5 = new TaskEntity(ids[5], 'Something important');
    task5.project = projectA;
    em.persist([task0, task1, task2, task3, task4, task5]);

    const task6 = new TaskEntity(ids[6], 'Another important');
    task6.dueDate = new Date('2022-06-20');
    task6.project = projectB;
    const task7 = new TaskEntity(ids[7], 'Some task title');
    task7.description = 'I need to make it completed soon';
    task7.project = projectB;
    const task8 = new TaskEntity(ids[8], 'Other temp title');
    task8.project = projectB;
    const task9 = new TaskEntity(ids[9], 'Its important task');
    task9.description = 'No it is not. Just putted this title';
    task9.dueDate = new Date('2022-06-23');
    task9.project = projectB;
    const task10 = new TaskEntity(ids[10], 'Dummy dummy task');
    task10.description = 'Dummy description for dummy task';
    // task10.dueDate = new Date('2022-007-10T10:10:10');
    task10.project = projectB;
    const task11 = new TaskEntity(ids[11], 'Show me what is it');
    task11.project = projectB;
    const task12 = new TaskEntity(ids[12], 'I need to do that');
    task12.project = projectB;
    const task13 = new TaskEntity(ids[13], 'To not forgot');
    task13.project = projectB;
    em.persist([task6, task7, task8, task9, task10, task11, task12, task13]);

    const containersA = {
      'New': [ids[0], ids[1], ids[2]],
      'In Progress': [ids[3]],
      'Completed': [ids[4], ids[5]],
    };
    const placementA = new PlacementEntity(projectA.id, JSON.stringify(containersA));
    const containersB = {
      'New Tasks': [ids[6], ids[7], ids[8], ids[9]],
      'In Progress': [ids[10]],
      'Done': [ids[11], ids[12]],
      'Cancelled': [ids[13]],
    };
    const placementB = new PlacementEntity(projectB.id, JSON.stringify(containersB));
    em.persist([placementA, placementB]);

    em.flush();
  }
}
