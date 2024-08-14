import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { Observable, from } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';
import firebase from 'firebase/compat/app'; 
import { AuthUser } from '../models/interfaces/auth-user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private afAuth: AngularFireAuth, private router: Router) {}

  register(email: string, password: string): Observable<AuthUser> {
    return from(this.afAuth.createUserWithEmailAndPassword(email, password)).pipe(
      switchMap(userCredential => this.saveToken(userCredential.user))
    );
  }

  login(email: string, password: string): Observable<AuthUser> {
    return from(this.afAuth.signInWithEmailAndPassword(email, password)).pipe(
      switchMap(userCredential => this.saveToken(userCredential.user))
    );
  }

  logout(): void {
    this.afAuth.signOut().then(() => {
      localStorage.removeItem('authToken');
      this.router.navigate(['/auth/login']);
    });
  }

  private saveToken(user: firebase.User | null): Observable<AuthUser> {
    return from(user?.getIdToken() || Promise.resolve('')).pipe(
      map(token => {
        if (token) {
          localStorage.setItem('authToken', token);
        }
        return {
          userId: user?.uid || '',
          email: user?.email || null,
          token: token
        } as AuthUser;
      })
    );
  }

  getToken(): string | null {
    return localStorage.getItem('authToken');
  }

  getUserId(): Observable<string | null> {
    return this.afAuth.authState.pipe(
      map(user => user ? user.uid : null)
    );
  }
}
