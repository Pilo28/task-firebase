import { Component, EventEmitter, Output, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Task } from './../../../core/models/interfaces/task.model';


@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.scss'
})
export class TaskFormComponent implements OnInit {
  @Output() taskAdded = new EventEmitter<Task>();
  @Input() taskToEdit: Task | null = null;

  taskForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.taskForm = this.fb.group({
      title: ['', Validators.required],
      description: [''],
      dueDate: [null],
      completed: [false]
    });
  }

  ngOnInit(): void {
    if (this.taskToEdit) {
      this.taskForm.patchValue(this.taskToEdit); 
    }
  }

  onSubmit() {
    if (this.taskForm.valid) {
      const newTask: Task = this.taskForm.value;
      this.taskAdded.emit(newTask);
      this.taskForm.reset();
    }
  }
}
