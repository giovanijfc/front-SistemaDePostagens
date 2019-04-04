import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { CredenciaisDTO } from "../models/credenciais.dto";
import { API_CONFIG } from "../config/api.config";
import { LocalUser } from "../models/local_user";
import { StorageService } from "./storage.service";
import {JwtHelper} from 'angular2-jwt' ;
import { NovaSenha } from "../models/novasenha.dto";
import { httpFactory } from "@angular/http/src/http_module";


@Injectable()
export class AuthService {

    jwtHelper: JwtHelper = new JwtHelper();

    constructor(public http: HttpClient, public storageService: StorageService) {
    }

    authenticate(creds: CredenciaisDTO) {
        return this.http.post(
            `${API_CONFIG.baseUrl}/login`,
            creds,
            {
                observe: 'response',
                responseType: 'text'
            }
        );
    }

    novaSenha(newPass: NovaSenha){
        return this.http.put(`${API_CONFIG.baseUrl}/auth/esqueciASenha`,
        newPass,
        {
            observe: 'response',
            responseType: 'text'
        });
    }

    refreshToken(){
        return this.http.post(
            `${API_CONFIG.baseUrl}/auth/refresh_token`,
            {},
            {
                observe:'response',
                responseType:'text'
            }
        )
    }

    sucessfulLogin(authorizationValue: String){
        let tok = authorizationValue.substring(7);
        let user : LocalUser = {
            token: tok,
            email: this.jwtHelper.decodeToken(tok).sub
        };
        this.storageService.setLocalUser(user);
    }
    logout(){
        this.storageService.setLocalUser(null);
    }
}