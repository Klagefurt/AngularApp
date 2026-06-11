import { HttpErrorResponse, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from "@angular/common/http";
import { Auth } from "./auth";
import { inject } from "@angular/core";
import { catchError, switchMap, throwError } from "rxjs";

export const authTokenInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(Auth);
  const token = authService.accessToken;

  // If no token, just pass the request
  if (!token) { return next(req); }

  // Clone the request and add the Authorization header
  const authReq = req.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`,
    },
  }); 

  return next(authReq).pipe(
    catchError((error: HttpErrorResponse) => {
      // If we get a 401, try to refresh the token
      if (error.status === 401) {

        return authService.refreshAuthToken().pipe(
          // Here we got the NEW tokens
          switchMap((newTokens) => {
            // Clone the original request with the NEW access_token 
            const retryReq = req.clone({
              setHeaders: {
                Authorization: `Bearer ${newTokens.access_token}`,
              },
            });
            // Retry the original request with the new token
            return next(retryReq);
          })
        );
      }
      return throwError(() => error);
    })
  );
}

