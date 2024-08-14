import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FirebaseConfigService {

  private secretKey = 'Pilo@123'; // Debe coincidir con la clave usada en la encriptación

  constructor() {}

  // Implementación completa del método
  getFirebaseConfig() {
    const decryptedConfigString = CryptoJS.AES.decrypt(environment.encryptedFirebaseConfig, this.secretKey).toString(CryptoJS.enc.Utf8);
    return JSON.parse(decryptedConfigString);
  }
}
