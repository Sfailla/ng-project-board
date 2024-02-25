import { HttpInterceptorFn, HttpRequest, HttpHandlerFn, HttpEvent } from '@angular/common/http'
import { Observable } from 'rxjs/internal/Observable'

export const authInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> => {
  const token = localStorage.getItem('auth-token') || null
  return next(token ? req.clone({ setHeaders: { 'x-auth-token': token } }) : req)
}
