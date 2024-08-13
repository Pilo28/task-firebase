import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private tasksCollection: any;

  constructor(private firestore: AngularFirestore) {
    this.tasksCollection = this.firestore.collection('tasks');
  }

  getTasks(): Observable<any[]> {
    return this.tasksCollection.valueChanges({ idField: 'id' });
  }

  addTask(task: any): Promise<any> {
    return this.tasksCollection.add(task);
  }

  updateTask(id: string, task: any): Promise<void> {
    return this.tasksCollection.doc(id).update(task);
  }

  deleteTask(id: string): Promise<void> {
    return this.tasksCollection.doc(id).delete();
  }
}
