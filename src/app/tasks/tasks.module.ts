import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { TasksRoutingModule } from './tasks-routing.module';

import { TasksListComponent } from './tasks-list/tasks-list.component';
import { TasksFormComponent } from './tasks-form/tasks-form.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TasksRoutingModule,
    HttpClientModule,
  ],
  declarations: [TasksListComponent, TasksFormComponent],
  providers: []
})
export class TasksModule {}
