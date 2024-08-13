import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { errorHandlingInterceptor } from './core/interceptors/error-handling-interceptor.interceptor';
import { loggingInterceptor } from './core/interceptors/logging-interceptor.interceptor';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from '../environments/environment';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    AngularFireModule.initializeApp(environment.firebaseConfig), 
    AngularFireAuthModule, 
    AngularFirestoreModule 
  ],
  providers: [
    provideHttpClient(
      withInterceptors([
        errorHandlingInterceptor, loggingInterceptor
      ])
    ),
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
