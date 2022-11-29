import { Component, Input, OnInit } from "@angular/core";
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { Subscription } from "rxjs";
import { CreateTask } from "../../models/create-task-model";
import { Task } from "../../models/task-model";
import { TaskService } from "../../services/task.service";

@Component({
    selector: 'add-task',
    templateUrl: './add-task.component.html',
    styleUrls: ['./add-task.component.scss']
})
export class AddTaskComponent implements OnInit {
    @Input() task!: Task;
    @Input() getTasks!: Function;

    formGroup!: FormGroup;
    sourceCommandChangeSub$ = new Subscription();
    newTaskDate!: Date;

    constructor(
        private formBuilder: FormBuilder,
        private toastrService: ToastrService,
        private taskService: TaskService,
    ) { }

    ngOnInit(): void {
        this.createForm();
    }

    public get name() { return this.formGroup.get('name') as FormControl; }
    public get description() { return this.formGroup.get('description') as FormControl; }
    public get dueIn() { return this.formGroup.get('dueIn') as FormControl; }

    createForm() {
        this.formGroup = this.formBuilder.group({
            'name': [null, null],
            'description': [null, null],
            'dueIn': [null, null]
        });
    }

    onAdd() {
        if (!this.formGroup.valid) {
            this.toastrService.warning('Please fill in correctly the required data');
            return;
        }

        let newTask: CreateTask;
        newTask = {
            name: this.formGroup.get('name')?.value,
            description: this.formGroup.get('description')?.value,
            dueIn: this.formGroup.get('dueIn')?.value
        };

        this.taskService.createTask(newTask)
            .subscribe({
                next: () => {
                    this.getTasks();
                    this.toastrService.success("A new task has been created.");
                    this.formGroup.reset();
                },
                error: () => { this.toastrService.error("An error occured when trying to create new task.") }
            });
    }
}