import { Component } from '@angular/core';

import { TaskService } from './../../../core/services/task.service';
import { Task } from './../../../core/models/interfaces/task.model';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

  tasks: Task[] = [];

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks() {
    this.taskService.getTasks().subscribe(tasks => {
      this.tasks = tasks;
    });
  }

  onTaskAdded(newTask: Task) {
    this.taskService.addTask(newTask).subscribe(() => {
      this.loadTasks(); 
    });
  }

  onTaskUpdated(updatedTask: Task) {
    if (updatedTask.id) {
      this.taskService.updateTask(updatedTask.id, updatedTask).subscribe(() => {
        this.loadTasks(); 
      });
    }
  }

  onTaskDeleted(taskId: string) {
    this.taskService.deleteTask(taskId).subscribe(() => {
      this.loadTasks(); 
    });
  }
}
