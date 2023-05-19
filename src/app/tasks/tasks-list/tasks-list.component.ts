import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

import { TaskListService } from 'src/app/task-list/task-list.service';
import { TaskService } from '../task.service';

import { Task } from 'src/interfaces/task.interface';
import { TaskList } from 'src/interfaces/task-list.interface';

import 'jquery';
declare var $: any;

@Component({
  selector: 'app-tasks-list',
  templateUrl: './tasks-list.component.html',
  styleUrls: ['./tasks-list.component.css'],
})
export class TasksListComponent implements OnInit {
  render: boolean = false;
  tasklistId!: number;
  tasksList: Task[] = [];
  taskToUpdate: Task | null = null;

  constructor(
    private taskService: TaskService,
    private taskListService: TaskListService,
    private route: ActivatedRoute
  ) {
    this.tasklistId = Number(this.route.snapshot.params['id']);
  }

  ngOnInit(): void {
    this.getTasks();
  }

  getTasks(): void {
    this.render = false;
    this.taskListService
      .getOneTaskList(this.tasklistId)
      .pipe(take(1))
      .subscribe((resp: TaskList) => {
        this.tasksList = resp.tasks || [];
        this.render = true;
      });
  }

  createTask(data: Task) {
    data.list_id = this.tasklistId
    this.render = false;
    this.taskService
      .createTask(data)
      .pipe(take(1))
      .subscribe({
        next: (resp) => {
          this.render = true;
          console.log(resp);
        },
      });
  }

  updateTask(data: Task) {
    data.list_id = this.tasklistId
    this.render = false;
    this.taskService
      .updateTask(data)
      .pipe(take(1))
      .subscribe({
        next: (resp) => {
          this.render = true;
          console.log(resp);
        },
      });
  }

  deleteTask(id: number): void {
    this.render = false;
    this.taskService
      .deleteTask(id)
      .pipe(take(1))
      .subscribe({
        next: (resp) => {
          this.render = true;
          console.log(resp);
        },
      });
  }

  setTaskToEdit(data: Task) {
    this.taskToUpdate = data;
    $('#tasksModal').modal('show');
  }
}
