import { NgModule } from "@angular/core";
import { MatSortModule } from "@angular/material/sort";
import { MatTableModule } from "@angular/material/table";
import { TaskComponent } from "./components/task/task.component";
import { TaskService } from "./services/task.service";
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { TaskRowActionsComponent } from "./components/task-row-actions/task-row-actions.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AddTaskComponent } from "./components/add-task/add-task.component";
import { MatInputModule } from "@angular/material/input";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatNativeDateModule } from "@angular/material/core";
import { TaskEndpointService } from "./services/endpoint-services/task-endpoint.service";

@NgModule({
  declarations: [
    TaskComponent,
    TaskRowActionsComponent,
    AddTaskComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatSortModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonToggleModule,
    BrowserAnimationsModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  exports: [
    TaskComponent,
    TaskRowActionsComponent,
    AddTaskComponent
  ],
  providers: [
    TaskService,
    TaskEndpointService
  ]
})
export class TaskModule { }