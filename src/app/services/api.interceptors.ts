import { HttpEvent, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable, delay, of } from 'rxjs';

export function apiInterceptor(): Observable<HttpEvent<unknown>> {
  return of(new HttpResponse({ status: 200 })).pipe(delay(2000));
}
