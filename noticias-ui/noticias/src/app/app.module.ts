import { DialogComponent } from "./util/dialog/dialog.component";
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { TelaInicialComponent } from "./tela-inicial/tela-inicial.component";
import { CadastrarNoticiaComponent } from "./cadastrar-noticia/cadastrar-noticia.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import {
  MatButtonModule,
  MatDatepickerModule,
  MAT_DATE_LOCALE,
  MatNativeDateModule,
  MatPaginatorIntl,
} from "@angular/material";
import { MatIconModule } from "@angular/material";
import { MatCardModule } from "@angular/material/card";
import { MatInputModule } from "@angular/material/input";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { MatTableModule } from "@angular/material";
import { BuscarNoticiasComponent } from "./buscar-noticias/buscar-noticias.component";
import { getPtBrPaginatorIntl } from "./util/paginator/br-paginator";
import { MatPaginatorModule } from "@angular/material";
import { MatDialogModule } from "@angular/material/dialog";
import { MatTooltipModule } from "@angular/material/tooltip";
import { DialogBasicComponent } from "./util/dialogBasic/dialogBasic.component";

@NgModule({
  declarations: [
    AppComponent,
    TelaInicialComponent,
    CadastrarNoticiaComponent,
    BuscarNoticiasComponent,
    DialogComponent,
    DialogBasicComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatNativeDateModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatTableModule,
    MatPaginatorModule,
    MatDialogModule,
    MatTooltipModule,
  ],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: "pt-BR" },
    { provide: MatPaginatorIntl, useValue: getPtBrPaginatorIntl() },
  ],
  bootstrap: [AppComponent],
  entryComponents: [DialogComponent, DialogBasicComponent],
})
export class AppModule {}
