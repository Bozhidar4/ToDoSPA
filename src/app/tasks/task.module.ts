import { NgModule } from "@angular/core";
import { MatSortModule } from "@angular/material/sort";
import { MatTableModule } from "@angular/material/table";
import { TaskComponent } from "./components/task/task.component";
import { TaskEndpointService } from "./endpoint-services/task-endpoint.service";
import { TaskService } from "./services/task.service";

@NgModule({
    declarations: [
      TaskComponent
    ],
    imports: [
        MatSortModule,
        MatTableModule
    ],
    exports: [
        TaskComponent
    ],
    providers: [
        TaskService, 
        TaskEndpointService
    ]
  })
  export class TaskModule { }