import { Injectable, Component } from "@angular/core";
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HTTP_INTERCEPTORS,  } from '@angular/common/http';
import { Observable } from 'rxjs/Rx'; // IMPORTANTE: IMPORT ATUALIZADO
import { AlertController } from "ionic-angular";


@Injectable()
export class ErrorInterceptor implements HttpInterceptor{

    constructor(public alertCtrl: AlertController){

    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {


        return next.handle(req)
         .catch((error, caught) => {
             let errorObj = error;

             if(errorObj.error){
                errorObj = errorObj.error;
             } 
             if(!errorObj.status){
                errorObj = JSON.parse(errorObj);
             }
             errorObj.title
             
            switch(errorObj.status){
            case 401:
            this.handle401();
            break;    
            case 400:
            this.defaultHandler(errorObj);
            break; 
            }
             return Observable.throw(error);
         }) as any;
    }

    handle401(){
        let alert = this.alertCtrl.create({
            title: 'Erro 401: Falha na autenticação',
            message: 'Email ou senha incorretos!',
            enableBackdropDismiss: false,
            buttons: ['OK']
          });
          alert.present();
        }

    handle400(){
        let alert = this.alertCtrl.create({
            title: 'Error 400: Invalid request',
            message: 'E-mail already registered',
            enableBackdropDismiss: false,
            buttons: ['OK']
          });
          alert.present();
        }
    
    
    defaultHandler(obj: any){
        let alert = this.alertCtrl.create({
            title: obj.status+": "+ obj.error,
            message: obj.message,
            enableBackdropDismiss: false,
            buttons:['OK']
        });
        alert.present();
    }
}  

export const ErrorInterceptorProvider ={
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorInterceptor,
    multi: true,
};