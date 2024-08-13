import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private afAuth: AngularFireAuth, private router: Router) {}

  async register(email: string, password: string) {
    try {
      const userCredential = await this.afAuth.createUserWithEmailAndPassword(email, password);
      const token = await userCredential.user?.getIdToken();
      if (token) {
        localStorage.setItem('authToken', token);
      }
      return userCredential;
    } catch (error) {
      console.error("Error during registration: ", error);
      throw error;
    }
  }

  async login(email: string, password: string) {
    try {
      const userCredential = await this.afAuth.signInWithEmailAndPassword(email, password);
      const token = await userCredential.user?.getIdToken();
      if (token) {
        localStorage.setItem('authToken', token);
      }
      return userCredential;
    } catch (error) {
      console.error("Error during login: ", error);
      throw error;
    }
  }

  logout() {
    this.afAuth.signOut().then(() => {
      localStorage.removeItem('authToken');
      this.router.navigate(['/login']);
    });
  }

  getToken(): string | null {
    return localStorage.getItem('authToken');
  }
}
