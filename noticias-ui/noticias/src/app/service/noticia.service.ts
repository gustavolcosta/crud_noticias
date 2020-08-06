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

  buscarTodasNoticias(): Observable<any> {
    return this.http.get(`${URL_API}/noticia`);
  }

  buscarNoticiaFiltrada(noticiaBusca): Observable<any> {
    return this.http.post(`${URL_API}/noticia/buscarNoticia`, noticiaBusca);
  }

  buscarNoticiaPorId(idNoticia): Observable<any> {
    return this.http.get(`${URL_API}/noticia/buscarNoticia/${idNoticia}`);
  }

  alterarNoticia(idNoticia, noticiaAtualizada): Observable<any> {
    return this.http.put(
      `${URL_API}/noticia/alterar/${idNoticia}`,
      noticiaAtualizada
    );
  }

  removerNoticia(idNoticia): Observable<any> {
    return this.http.delete(`${URL_API}/noticia/${idNoticia}`);
  }
}
