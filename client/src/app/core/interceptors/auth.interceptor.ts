import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const xsrfToken = document?.cookie?.split("=")[1];
  
  const clonedRequest = req.clone({
    withCredentials:true,
    setHeaders : {
      'X-XSRF-TOKEN' : xsrfToken ?? ''
    }
  });

  return next(clonedRequest);
};
