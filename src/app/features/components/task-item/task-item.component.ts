import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Task } from '../../../core/models/interfaces/task.model';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrl: './task-item.component.scss'
})
export class TaskItemComponent {
  @Input() task!: Task; 
  @Output() updateTask = new EventEmitter<Task>();
  @Output() deleteTask = new EventEmitter<string>();

  onToggleCompleted() {
    const updatedTask: Task = {
      ...this.task,
      completed: !this.task.completed 
    };
    this.updateTask.emit(updatedTask); 
  }

  onDelete() {
    if (this.task.id) {
      this.deleteTask.emit(this.task.id); 
    }
  }
}
