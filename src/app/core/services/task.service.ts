import { inject, Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable, from } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';
import { AuthService } from './auth.service';

export interface Task {
  id?: string;
  title: string;
  description?: string;
  completed: boolean;
  dueDate?: Date;
  userId: string; // Añadimos userId para asociar la tarea al usuario
}

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private firestore = inject(AngularFirestore); 
  private authService = inject(AuthService); 

  // Obtener las tareas del usuario autenticado
  getTasks(): Observable<Task[]> {
    return this.authService.getUserId().pipe(
      switchMap(userId => {
        if (!userId) {
          throw new Error("User is not authenticated");
        }
        return this.firestore.collection<Task>('tasks', ref => ref.where('userId', '==', userId)).valueChanges({ idField: 'id' });
      })
    );
  }

  // Añadir una nueva tarea para el usuario autenticado
  addTask(task: Task): Observable<void> {
    return this.authService.getUserId().pipe(
      switchMap(userId => {
        if (!userId) {
          throw new Error("User is not authenticated");
        }
        const taskToAdd = { ...task, userId }; // Asociar la tarea al userId
        return from(this.firestore.collection('tasks').add(taskToAdd).then(() => {}));
      })
    );
  }

  // Actualizar una tarea existente
  updateTask(id: string, task: Task): Observable<void> {
    return from(this.firestore.collection('tasks').doc(id).update(task));
  }

  // Eliminar una tarea
  deleteTask(id: string): Observable<void> {
    return from(this.firestore.collection('tasks').doc(id).delete());
  }
}
