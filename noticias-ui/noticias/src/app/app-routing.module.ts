import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { CadastrarNoticiaComponent } from "./cadastrar-noticia/cadastrar-noticia.component";

const routes: Routes = [
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
