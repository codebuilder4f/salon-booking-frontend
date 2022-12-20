import { Injectable } from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import { Observable } from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import {throwError} from 'rxjs';
import { SnackbarService } from 'ngx-snackbar';
import { ToastrService } from 'ngx-toastr';


@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private snackbarService: SnackbarService, private toastrService: ToastrService) {}

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(req).pipe(

      tap(evt => {
        if (evt instanceof HttpResponse) {
          if(evt.status == 200) {
            let message = evt.body.message;
            if (message !== undefined && message !== null && message !== "Done" && message !== "") {
              this.toastrService.success("",message);
            }
          }
        }
      }),
      catchError((error: HttpErrorResponse ) => {
        this.snackbarService.clear();
        if (error.status == 500){
          this.toastrService.error("Internal Server Error")
        }else if (error.status == 404){
          this.toastrService.error("page not found")
        }else if (error.status == 400){
          let m = error.error.body.message;
          if (m == null){
            m = "Invalid request body"
          }
          this.toastrService.error(m)
        }else if (error.status === 401 ){
          let message = error.error.message;
          if (message == null){
            message = "You are not authorize"
          }
          this.toastrService.error(message)
        }else {
          this.toastrService.error("Unknown Error")
        }

        return throwError(error);
      })
    );
  }
}
