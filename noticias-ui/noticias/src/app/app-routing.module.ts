import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { CadastrarNoticiaComponent } from "./cadastrar-noticia/cadastrar-noticia.component";
import { TelaInicialComponent } from "./tela-inicial/tela-inicial.component";

const routes: Routes = [
  {
    path: "",
    component: TelaInicialComponent,
  },
  {
    path: "cadastrar-noticia",
    component: CadastrarNoticiaComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
