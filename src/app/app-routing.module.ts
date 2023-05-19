import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'task-list',
    loadChildren: () =>
      import('./task-list/task-list.module').then((m) => m.TaskListModule),
  },
  {
    path: ':id/task',
    loadChildren: () =>
      import('./tasks/tasks.module').then(m => m.TasksModule),
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'task-list'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
