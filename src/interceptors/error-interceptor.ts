import { Injectable, Component } from "@angular/core";
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HTTP_INTERCEPTORS, } from '@angular/common/http';
import { Observable } from 'rxjs/Rx'; // IMPORTANTE: IMPORT ATUALIZADO
import { AlertController } from "ionic-angular";


@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

    constructor(public alertCtrl: AlertController) {

    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {


        return next.handle(req)
            .catch((error, caught) => {
                let errorObj = error;

                if (errorObj.error) {
                    errorObj = errorObj.error;
                }
                if (!errorObj.status) {
                    errorObj = JSON.parse(errorObj);
                }
                errorObj.title

                switch (errorObj.status) {
                    case 401:
                        this.handle401(errorObj);
                        break;
                    case 400:
                        if (errorObj.message == "Required request body is missing: public org.springframework.http.ResponseEntity<com.giovanijfc.sistemadepostagens.domain.Postagem> com.giovanijfc.sistemadepostagens.resource.PostagemResource.adicionar(java.lang.String,java.lang.Integer)") {
                            errorObj.message = "Dados da postagem incorreta, tente novamente!";
                            this.handle400(errorObj);
                            break;
                        }else{
                            this.handle400(errorObj);
                            break;
                        }
                    case 403:
                        this.handle403(errorObj)
                        break;
                }
                return Observable.throw(error);
            }) as any;
    }

    handle401(obj: any) {
        let alert = this.alertCtrl.create({
            title: 'Erro 401: Falha na autenticação',
            message: obj.message,
            enableBackdropDismiss: false,
            buttons: ['OK']
        });
        alert.present();
    }

    handle400(obj: any) {
        let alert = this.alertCtrl.create({
            title: 'Erro 400: Requisição ruim ',
            message: obj.message,
            enableBackdropDismiss: false,
            buttons: ['OK']
        });
        alert.present();
    }
    handle403(obj: any) {
        let alert = this.alertCtrl.create({
            title: 'Erro 403: Acesso Negado',
            message: obj.message,
            enableBackdropDismiss: false,
            buttons: ['OK']
        });
        alert.present();
    }


    defaultHandler(obj: any) {
        let alert = this.alertCtrl.create({
            title: obj.status + ": " + obj.error,
            message: obj.message,
            enableBackdropDismiss: false,
            buttons: ['OK']
        });
        alert.present();
    }
}

export const ErrorInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorInterceptor,
    multi: true,
};