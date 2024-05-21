import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { ErrorService } from '../services/error.service';
import { inject } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

export const addTokenInterceptor: HttpInterceptorFn = (req, next) => {
  // console.log(req.url)
    const errorService = inject(ErrorService);
    const router = inject(Router)
    
    const userService = inject(UserService);
    const token = userService.getToken();
    // console.log(token)

    if(token){
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      })
    }

    




    return next(req).pipe(
      catchError((err: HttpErrorResponse) => {
        if(err.status === 401){
          const error = errorService.msgError(err)
          router.navigate(['/login'])
        }
        return throwError(() => err);
      })
    )
  return next(req)
};


