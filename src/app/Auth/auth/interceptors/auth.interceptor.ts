import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { catchError, retry, switchMap, throwError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService=inject(AuthService);
  const accessToken=authService.getAccessToken();
  if(accessToken){
    req=req.clone({
      setHeaders:{
          Authorization: `Bearer ${accessToken}`
      }
    })
  }
  
  return next(req).pipe(catchError(err=>{
   if(err.status ===401){
    return authService.refreshToken().pipe(switchMap(()=>{
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${authService.getAccessToken()}`
        }
      });
      return next(req);
    }),
    retry(2),
    catchError(err => {
      authService.logout(); // Invalidate session
      return throwError(() => err);
    }))
   }

    return throwError(()=>err)
  }));
};
