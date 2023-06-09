import { Observable, take } from 'rxjs';
import { Component, OnInit } from '@angular/core';

import { TaskListService } from './../task-list.service';

import { TaskList } from './../../../interfaces/task-list.interface';

import 'jquery';
declare var $: any;

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css'],
})
export class TaskListComponent implements OnInit {
  taskList$!: Observable<TaskList[]>;
  render: boolean = true;
  taskListToEdit: TaskList | null = null;

  constructor(private tasklistService: TaskListService) {}

  ngOnInit(): void {
    this.getDataLists();
  }

  // Class methods

  getDataLists() {
    this.taskList$ = this.tasklistService.getAllTaskList().pipe(take(1));
  }

  createList(data: TaskList) {
    this.tasklistService
      .createTaskList(data)
      .pipe(take(1))
      .subscribe({
        next: (resp) => console.log(resp),
      });
  }

  updateList(data: TaskList) {
    this.tasklistService
      .updateTaskList(data)
      .pipe(take(1))
      .subscribe({
        next: (resp) => console.log(resp),
      });
  }

  deleteTaskList(id: number) {
    this.render = false;
    this.tasklistService
      .deleteTaskList(id)
      .pipe(take(1))
      .subscribe((_) => {
        this.render = true;
        this.getDataLists();
      });
  }

  setTaskListToEdit(data: TaskList) {
    this.taskListToEdit = data
    $('#taskListModal').modal('show');
  }
}
