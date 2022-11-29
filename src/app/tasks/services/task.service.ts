import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { CreateTask } from "../models/create-task-model";
import { EditTask } from "../models/edit-task-model";
import { Result } from "../models/result-model";
import { TaskEndpointService } from "./endpoint-services/task-endpoint.service";

@Injectable()
export class TaskService {

  constructor(private taskEndpointService: TaskEndpointService) { }

  getTasks(): Observable<Result> {
    return this.taskEndpointService.getList();
  }

  getTask(taskId: number): Observable<Result> {
    return this.taskEndpointService.get(taskId);
  }

  createTask(addItemRequest: CreateTask): Observable<any> {
    return this.taskEndpointService.add(addItemRequest);
  }

  editTask(addItemRequest: EditTask): Observable<any> {
    return this.taskEndpointService.edit(addItemRequest);
  }

  deleteTask(taskId: number): Observable<any> {
    return this.taskEndpointService.delete(taskId);
  }
}