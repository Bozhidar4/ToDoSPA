import { Component, OnDestroy, OnInit } from "@angular/core";
import { TaskService } from "../../services/task.service";
import { MatTableDataSource } from "@angular/material/table";
import { Task } from "../../models/task-model";
import { TaskStatus } from "../../models/task-status-model";
import { Subscription } from "rxjs";

@Component({
    selector: 'task',
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
        "isDone",
        "status",
        "actions"
    ];
    sourceCommandChangeSub$ = new Subscription();

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
            task.status = this.setStatus(task, currentDate);
            task.canComplete = this.setCanComplete(task, currentDate);
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
                result = timeDifferenceInHours > 12
                    ? TaskStatus.TwelveHoursOrMoreRemaining.toString()
                    : TaskStatus.LessThan12hRemaining.toString();
            }
        }

        return result;
    }

    setCanComplete(task: Task, currentDate: Date): boolean {
        let dueDate = new Date(task.dueDate);
        return !task.isDone && dueDate > currentDate;
    }
}