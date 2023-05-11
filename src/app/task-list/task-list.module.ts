import { TaskListService } from './task-list.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TaskListComponent } from './task-list/task-list.component';
import { ClientRoutingModule } from './task-list-routing.module';

@NgModule({
  declarations: [TaskListComponent],
  imports: [CommonModule, ClientRoutingModule, HttpClientModule],
  exports: [TaskListComponent],
  providers: [TaskListService]
})
export class TaskListModule {}
