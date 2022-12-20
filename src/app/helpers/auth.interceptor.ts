import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoadingService } from '../service/loading.service';
import {catchError, map} from 'rxjs/operators';
import { ConstService } from '../service/const.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor( 
    private _loading: LoadingService,
    private constService: ConstService) {}

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<any>> {
    this._loading.setLoading(true, req.url);
    const token = this.constService.getUserToken()
    if (!req.headers.has('Access-Control-Allow-Origin')) {
      req = req.clone({
        headers: req.headers.set('Access-Control-Allow-Origin', '*')
      });
    }
    req = req.clone({
      headers: req.headers.set('Access-Control-Allow-Credentials', 'true')
    });

    if (!req.headers.has('Authorization') && token){
      req = req.clone({
        headers: req.headers.set('Authorization', token)
      })
    }

    return next.handle(req)
      .pipe(catchError((err) => {
        this._loading.setLoading(false, req.url);
        return err;
      }))
      // @ts-ignore
      .pipe(map<HttpEvent<any>, any>((evt: HttpEvent<any>) => {
        if (evt instanceof HttpResponse) {
          this._loading.setLoading(false, req.url);
        }
        return evt;
      }));
  }
}
