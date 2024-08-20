import { HttpInterceptorFn } from '@angular/common/http';
import { tap } from 'rxjs/operators';

export const loggingInterceptor: HttpInterceptorFn = (req, next) => {
  console.log('Request made to:', req.url);

  return next(req).pipe(
    tap(() => {
      console.log('Response received from:', req.url);
    })
  );
};
