import { Injectable } from "@angular/core";
import { StorageService } from "../storage.service";
import { HttpClient } from "@angular/common/http";
import { API_CONFIG } from "../../config/api.config";
import { Observable } from "rxjs";

@Injectable()
export class PostagemService {

    constructor(public http: HttpClient, public localStorage: StorageService) {
    }

    public enviarPostagem(id: String, texto: String){
        return this.http.post(
            `${API_CONFIG.baseUrl}/postagem/adicionarPostagem?id=${id}`,
            texto,
            {
                observe: "response",
                responseType: "text"
            });
    }
}