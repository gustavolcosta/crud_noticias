import { URL_API } from "./url.api";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

//Classe utilizada para as chamadas da API do backend

@Injectable({
  providedIn: "root",
})
export class NoticiaService {
  constructor(private http: HttpClient) {}

  salvarNoticia(noticia): Observable<any> {
    return this.http.post(`${URL_API}/noticia/`, noticia);
  }
}
