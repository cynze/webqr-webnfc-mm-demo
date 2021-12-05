import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Injectable()
export class HttpInterceptorService implements HttpInterceptor {

  constructor(public router: Router, public toastController: ToastController) {
  }

  async errorToast(message: string) {
    const toast = await this.toastController.create({
      color: 'danger',
      message,
      duration: 5000
    });
    toast.present();
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error) => {
        this.errorToast(`${error.status}: ${error.statusText}`);
        return throwError(error.message);
      })
    );
  }
}
