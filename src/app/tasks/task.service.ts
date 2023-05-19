import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { Task } from 'src/interfaces/task.interface';

import { apiUrl } from 'src/environment/environment';

@Injectable({ providedIn: 'root' })
export class TaskService {
  constructor(private http: HttpClient) {}

  getAllTasks() {
    return this.http
      .get(`${apiUrl}/tasks`)
      .pipe(map((resp: any) => resp['data']));
  }

  getOneTask(id: number) {
    return this.http
      .get(`${apiUrl}/tasks/${id}`)
      .pipe(map((resp: any) => resp['data']));
  }

  createTask(data: Task) {
    return this.http.post(`${apiUrl}/tasks`, data);
  }

  updateTask(data: Task) {
    return this.http.put(`${apiUrl}/tasks/${data.id}`, data);
  }

  deleteTask(id: number) {
    return this.http.delete(`${apiUrl}/tasks/${id}`);
  }
}
