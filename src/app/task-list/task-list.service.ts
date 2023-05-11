import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { TaskList } from './../../interfaces/task-list.interface';
import { apiUrl } from 'src/environment/environment';

@Injectable({ providedIn: 'root' })
export class TaskListService {
  constructor(private http: HttpClient) {}

  getAllTaskList() {
    return this.http
      .get(`${apiUrl}/task-list`)
      .pipe(map((resp: any) => resp['data']));
  }

  getOneTaskList(id: number) {
    return this.http
      .get(`${apiUrl}/task-list/${id}`)
      .pipe(map((resp: any) => resp['data']));
  }

  createTaskList(data: TaskList) {
    return this.http.post(`${apiUrl}/task-list`, data);
  }

  updateTaskList(data: TaskList) {
    return this.http.put(`${apiUrl}/task-list/${data.id}`, data);
  }

  deleteTaskList(id: number) {
    return this.http.delete(`${apiUrl}/task-list/${id}`);
  }
}
