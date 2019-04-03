import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { FormGroup } from "@angular/forms";
import { Observable } from "rxjs";
import { API_CONFIG } from "../../config/api.config";
import { ResponseType } from "@angular/http";

@Injectable()
export class UsuarioService {

    constructor(public http: HttpClient) {
    }

    public registrar(formGrupo: FormGroup) {
        return this.http.post(
            `${API_CONFIG.baseUrl}/usuario/adicionarUsuario`,
            formGrupo,
            {
                observe: "response",
                responseType: "text"
            }
        );
    }
}