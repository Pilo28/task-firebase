import { Component, EventEmitter, Input, Output } from '@angular/core';

import { Task } from './../../../core/models/interfaces/task.model';


@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss'
})
export class TaskListComponent {
  @Input() tasks: Task[] = [];
  @Output() taskUpdated = new EventEmitter<Task>();
  @Output() taskDeleted = new EventEmitter<string>();

  onUpdateTask(task: Task) {
    this.taskUpdated.emit(task);
  }

  onDeleteTask(taskId: string) {
    this.taskDeleted.emit(taskId);
  }
}
