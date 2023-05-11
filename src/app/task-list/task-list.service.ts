import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Task } from 'src/interfaces/task.interface';
import { apiUrl } from 'src/environment/environment';

@Injectable({ providedIn: 'root' })
export class TaskListService {
  constructor(private http: HttpClient) {}

  getAllTaskList() {
    return this.http
      .get(`${apiUrl}/task-list`)
      .pipe(map((resp: any) => resp['data']));
  }
}
