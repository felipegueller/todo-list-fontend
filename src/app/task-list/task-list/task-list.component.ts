import { Observable, take } from 'rxjs';
import { Component, OnInit } from '@angular/core';

import { TaskListService } from './../task-list.service';

import { TaskList } from './../../../interfaces/task-list.interface';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css'],
})
export class TaskListComponent implements OnInit {
  taskList$!: Observable<TaskList[]>;

  constructor(private tasklistService: TaskListService) {}

  ngOnInit(): void {
    this.taskList$ = this.tasklistService.getAllTaskList().pipe(take(1));
  }
}
