import { Component, OnInit } from "@angular/core";
import { TaskService } from "../../services/task.service";
import { MatTableDataSource } from "@angular/material/table";
import { Task } from "../../models/task-model";
import { TaskStatus } from "../../models/task-status-model";

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
        "status"
    ];

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

    defineTaskStatus(tasks: Task[]): void {
        
        tasks.forEach(task => {
            task.status = this.setStatus(task);
        });
    }

    setStatus(task: Task): string {
        let result = TaskStatus.Completed.toString();
        let currentDate = new Date();
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
}