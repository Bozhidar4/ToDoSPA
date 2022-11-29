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
}