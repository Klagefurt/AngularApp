import { HttpInterceptorFn } from "@angular/common/http";
import { Auth } from "./auth";
import { inject } from "@angular/core";

export const authTokenInterceptor: HttpInterceptorFn = (req, next) => {
  const token = inject(Auth).accessToken;

  if (!token) return next(req);

  const clonedReq = req.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`
    }
  });

  return next(clonedReq);
  
}
