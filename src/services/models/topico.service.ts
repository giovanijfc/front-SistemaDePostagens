import { Injectable } from "@angular/core";
import { StorageService } from "../storage.service";
import { HttpClient } from "@angular/common/http";
import { API_CONFIG } from "../../config/api.config";
import { Observable } from "rxjs";

@Injectable()
export class TopicoService {

    constructor(public http: HttpClient, public localStorage: StorageService) {
    }

    public buscarTodosPost(id: String) : Observable<any>{
        return this.http.get<any>(
            `${API_CONFIG.baseUrl}/topico/buscarTodosPostUser?idUser=${id}`)
    }
    
}