import { HttpInterceptorFn } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

export const errorHandlingInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      // manejo el error de manera global
      if (error.status === 401) {
        console.error('Unauthorized request - Redirect to login');
        // redirigir al usuario a la página de login o mostrar un mensaje de error
      } else if (error.status === 404) {
        console.error('Resource not found - Redirect to 404 page');
        // Redirige a una página 404 o muestra un mensaje de error
      } else {
        console.error('An unknown error occurred:', error.message);
        // Manejo global de errores
      }
      return throwError(() => error);
    })
  );
};
