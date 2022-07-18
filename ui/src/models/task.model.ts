
export interface TaskDto {
  id: string;
  name: string;
  description?: string;
  dueDate?: Date;
}

export class Task implements TaskDto {
  constructor(
    public id: string,
    public name: string,
    public description?: string,
    public dueDate?: Date,
  ) { }

  get formattedDate(): string {
    if (this.dueDate) {
      return this.dueDate.toLocaleDateString();
    }
    return 'none';
  }

  static clone(task: TaskDto): Task {
    const date = task.dueDate ? new Date(task.dueDate) : undefined;
    const description = task.description ? task.description : undefined;
    return new Task(task.id, task.name, description, date);
  }
}