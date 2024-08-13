import { Task } from './../models/interfaces/task.model';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable, from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private tasksCollection: AngularFirestoreCollection<Task>;

  constructor(private firestore: AngularFirestore) {
    this.tasksCollection = this.firestore.collection<Task>('tasks');
  }

  getTasks(): Observable<Task[]> {
    return this.tasksCollection.valueChanges({ idField: 'id' }); 
  }

  addTask(task: Task): Observable<void> {
    const taskToAdd = { ...task }; 
    return from(this.tasksCollection.add(taskToAdd).then(() => {}));
  }

  updateTask(id: string, task: Task): Observable<void> {
    return from(this.tasksCollection.doc(id).update(task));
  }

  deleteTask(id: string): Observable<void> {
    return from(this.tasksCollection.doc(id).delete());
  }
}
