import { Task } from "./task-model";

export interface Result {
    data: Task[];
    included: string;
    jsonapi: string;
  }