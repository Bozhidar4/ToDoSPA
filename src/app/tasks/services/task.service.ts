import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { TaskEndpointService } from "../endpoint-services/task-endpoint.service";
import { Result } from "../models/result-model";
import { Task } from "../models/task-model";

@Injectable()
export class TaskService {

  constructor(private taskEndpointService: TaskEndpointService) { }

  getTasks(): Observable<Result> {
    return this.taskEndpointService.getList();
  }

  getTask(taskId: number): Observable<Result> {
    return this.taskEndpointService.get(taskId);
  }

  createTask(addItemRequest: Task): Observable<any> {
    return this.taskEndpointService.add(addItemRequest);
  }

  editTask(addItemRequest: Task): Observable<any> {
    return this.taskEndpointService.edit(addItemRequest);
  }

  deleteTask(taskId: number): Observable<any> {
    return this.taskEndpointService.delete(taskId);
  }
}