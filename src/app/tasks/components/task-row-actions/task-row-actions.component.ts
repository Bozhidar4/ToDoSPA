import { Component, Input, OnInit } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import { EditTask } from "../../models/edit-task-model";
import { Task } from "../../models/task-model";
import { TaskService } from "../../services/task.service";

@Component({
    selector: "task-row-actions",
    templateUrl: "./task-row-actions.component.html",
    styleUrls: ["./task-row-actions.component.scss"]
})
export class TaskRowActionsComponent {
    @Input() task!: Task;
    @Input() getTasks!: Function;

    successMessage: string = "The task has been";
    errorMessage: string = "An error occured when trying to";

    constructor(
        private taskService: TaskService,
        private toastrService: ToastrService
    ) { }

    onDeleteClick() {
        this.taskService.deleteTask(this.task.id)
            .subscribe({
                next: () => { this.getTasks(); this.toastrService.success(`${this.successMessage} deleted`) },
                error: () => { this.toastrService.error(`${this.errorMessage} delete the task`) }
            });
    }

    onCompleteClick() {
        let taskToEdit: EditTask;
        taskToEdit = {
            id: this.task.id,
            name: this.task.name,
            description: this.task.description,
            dueDate: this.task.dueDate,
            isDone: true
        };

        this.taskService.editTask(taskToEdit)
            .subscribe({
                next: () => { this.getTasks(); this.toastrService.success(`${this.successMessage} marked as completed`) },
                error: () => { this.toastrService.error(`${this.errorMessage} edit the task`) }
            });
    }

    canComplete() {
        return this.task.canComplete;
    }
}