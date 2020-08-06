import { BuscarNoticiasComponent } from "./buscar-noticias/buscar-noticias.component";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { CadastrarNoticiaComponent } from "./cadastrar-noticia/cadastrar-noticia.component";
import { TelaInicialComponent } from "./tela-inicial/tela-inicial.component";

const routes: Routes = [
  {
    path: "inicio",
    component: TelaInicialComponent,
  },
  {
    path: "cadastro-noticia/cadastrar",
    component: CadastrarNoticiaComponent,
  },
  {
    path: "buscar-noticias",
    component: BuscarNoticiasComponent,
  },
  {
    path: "cadastro-noticia/editar/:id",
    component: CadastrarNoticiaComponent,
  },
  {
    path: "cadastro-noticia/visualizar/:id",
    component: CadastrarNoticiaComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
