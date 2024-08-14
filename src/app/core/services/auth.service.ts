import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { Observable, from } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';
import firebase from 'firebase/compat/app'; // Add this import

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private afAuth: AngularFireAuth, private router: Router) {}

  // Registrar un nuevo usuario, devuelve un Observable con el userCredential
  register(email: string, password: string): Observable<any> {
    return from(this.afAuth.createUserWithEmailAndPassword(email, password)).pipe(
      switchMap(userCredential => this.saveToken(userCredential.user))
    );
  }

  // Iniciar sesión, devuelve un Observable con el userCredential
  login(email: string, password: string): Observable<any> {
    return from(this.afAuth.signInWithEmailAndPassword(email, password)).pipe(
      switchMap(userCredential => this.saveToken(userCredential.user))
    );
  }

  // Cerrar sesión
  logout(): void {
    this.afAuth.signOut().then(() => {
      localStorage.removeItem('authToken');
      this.router.navigate(['/auth/login']);
    });
  }

  // Método para guardar el token en localStorage y devolver un Observable con el userCredential
  private saveToken(user: firebase.User | null): Observable<any> {
    return from(user?.getIdToken() || Promise.resolve('')).pipe(
      map(token => {
        if (token) {
          localStorage.setItem('authToken', token);
        }
        return user;
      })
    );
  }

  // Método para obtener el token (útil si decides seguir usando localStorage)
  getToken(): string | null {
    return localStorage.getItem('authToken');
  }

  // Método para obtener el ID del usuario autenticado como un Observable
  getUserId(): Observable<string | null> {
    return this.afAuth.authState.pipe(
      map(user => user ? user.uid : null)
    );
  }
}
