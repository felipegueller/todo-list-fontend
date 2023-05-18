import { TaskListService } from './task-list.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FieldErrorControlModule } from './../field-error-control/field-error-control.module';
import { TaskListComponent } from './task-list/task-list.component';
import { ClientRoutingModule } from './task-list-routing.module';
import { TaskListFormComponent } from './task-list-form/task-list-form.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [TaskListComponent, TaskListFormComponent],
  imports: [
    CommonModule,
    ClientRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FieldErrorControlModule,
  ],
  exports: [TaskListComponent],
  providers: [TaskListService],
})
export class TaskListModule {}
