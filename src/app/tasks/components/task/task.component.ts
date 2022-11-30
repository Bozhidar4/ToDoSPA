import { Component, OnDestroy, OnInit } from "@angular/core";
import { TaskService } from "../../services/task.service";
import { MatTableDataSource } from "@angular/material/table";
import { Task } from "../../models/task-model";
import { TaskStatus } from "../../models/task-status-model";
import { Subscription } from "rxjs";

@Component({
    selector: 'tasks',
    templateUrl: './task.component.html',
    styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {
    public tasks: MatTableDataSource<Task> = new MatTableDataSource<Task>([]);
    public displayedColumns: string[] = [
        "id",
        "name",
        "description",
        "dueDate",
        "status",
        "actions"
    ];
    sourceCommandChangeSub$ = new Subscription();
    timeThreshold: number = 12;

    constructor(
        private taskService: TaskService
    ) { }

    ngOnInit(): void {
        this.getTasks();
    }

    getTasks(): void {
        this.taskService.getTasks()
            .subscribe((result) => {
                this.defineTaskStatus(result.data);
                this.tasks = new MatTableDataSource(result.data);
            });
    }

    get getTasksFunction() {
        return this.getTasks.bind(this);
    }

    defineTaskStatus(tasks: Task[]): void {
        tasks.forEach(task => {
            let currentDate = new Date();
            let dueDate = new Date(task.dueDate);
            task.status = this.setStatus(task, currentDate);
            task.canComplete = this.setCanComplete(dueDate, currentDate, task.isDone);
            task.canDelete = this.setCanDelete(dueDate, currentDate, task.isDone);
        });
    }

    setStatus(task: Task, currentDate: Date): string {
        let result = TaskStatus.Completed.toString();

        let dueDate = new Date(task.dueDate);
        let timeDifferenceInHours = Math.abs(dueDate.getTime().valueOf()
            - currentDate.getTime().valueOf())
            / 36e5;

        if (!task.isDone) {
            if (dueDate < currentDate) {
                result = TaskStatus.Expired.toString();
            }
            else {
                result = timeDifferenceInHours > this.timeThreshold
                    ? TaskStatus.TwelveHoursOrMoreRemaining.toString()
                    : TaskStatus.LessThan12hRemaining.toString();
            }
        }

        return result;
    }

    // Keep the below two methods separate for better flexibility 
    // as they may have different logic in future
    // Currently both actions have same logic as per my understanding:
    // Complete task - when task is not overdue and obviously not completed
    // Delete task - when task is not completed and not past the due date
    setCanComplete(dueDate: Date, currentDate: Date, isDone: boolean): boolean {
        return !isDone && dueDate > currentDate;
    }

    setCanDelete(dueDate: Date, currentDate: Date, isDone: boolean): boolean {
        return !isDone && dueDate > currentDate;
    }
}