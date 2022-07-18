import { Options } from "@mikro-orm/core";

 
const config: Options = {
  entities: ['dist/**/*.entity.js'],
  entitiesTs: ['src/**/*.entity.ts'],
  password: 'todo_password',
  dbName: 'todo_db',
  user: 'todo_user',
  type: 'postgresql',
  host: 'postgres',
  seeder: {
    path: './seeders',
    pathTs: './seeders', 
    defaultSeeder: 'DbSeeder', 
    glob: '!(*.d).{js,ts}',
    emit: 'ts',
    fileName: (className: string) => className,
  },
}
 
export default config;