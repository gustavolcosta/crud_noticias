import { Component, OnInit, ViewChild } from "@angular/core";
import { FormGroup, FormBuilder, FormControl } from "@angular/forms";
import { NoticiaService } from "../service/noticia.service";
import {
  MatSort,
  MatTableDataSource,
  MatPaginator,
  MatDialog,
} from "@angular/material";
import { Noticia } from "./../model/Noticia";
import { DateFormatService } from "../service/date/dateFormat.service";
import { Router } from "@angular/router";
import { DialogComponent } from "../util/dialog/dialog.component";

@Component({
  selector: "app-buscar-noticias",
  templateUrl: "./buscar-noticias.component.html",
  styleUrls: ["./buscar-noticias.component.css"],
})
export class BuscarNoticiasComponent implements OnInit {
  formBusca: FormGroup;
  listaNoticias: Noticia[] = [];
  displayedColumns: string[] = ["titulo", "data", "acoes"];
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  dataSource = new MatTableDataSource();
  paginatorOptions = [10, 50, 100];

  constructor(
    private formBuilder: FormBuilder,
    private noticiaService: NoticiaService,
    private dateFormat: DateFormatService,
    private router: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.montarFormulario();
    this.buscarTodasNoticias();
  }

  buscarNoticias() {
    const noticiaBusca = {
      titulo: this.formBusca.value.titulo,
      conteudo: this.formBusca.value.conteudo,
      dataPublicacao: this.formBusca.value.dataPublicacao,
    };

    this.noticiaService
      .buscarNoticiaFiltrada(noticiaBusca)
      .subscribe((resultado) => {
        this.listaNoticias = resultado;
        this.montarTabelaNoticias(this.listaNoticias);
      });
  }

  montarFormulario() {
    this.formBusca = this.formBuilder.group({
      titulo: new FormControl(null),
      conteudo: new FormControl(null),
      dataPublicacao: new FormControl(null),
    });
  }

  buscarTodasNoticias() {
    this.noticiaService.buscarTodasNoticias().subscribe((resultado) => {
      this.listaNoticias = resultado;
      this.montarTabelaNoticias(this.listaNoticias);
    });
  }

  montarTabelaNoticias(listaNoticias) {
    this.dataSource.data = listaNoticias;
    this.dataSource.paginator = this.paginator;
    this.dataSource.sortingDataAccessor = (item, property) => {
      switch (property) {
        default:
          return item[property];
      }
    };
    this.dataSource.sort = this.sort;
  }

  calculaTamanhoPaginator() {
    return this.dataSource.data.filter((elem: any) => elem.ativo).length;
  }

  editarNoticia(noticia) {
    this.router.navigate([`/cadastro-noticia/editar/${noticia.id}`]);
  }

  visualizarNoticia(noticia) {
    this.router.navigate([`/cadastro-noticia/visualizar/${noticia.id}`]);
  }

  removerNoticia(noticia) {
    this.dialog
      .open(DialogComponent, {
        data: {
          message: "Deseja realmente remover essa noticia ?",
        },
      })
      .afterClosed()
      .subscribe((resposta) => {
        if (resposta) {
          this.noticiaService
            .removerNoticia(noticia.id)
            .subscribe((resposta) => {
              const index = this.listaNoticias.indexOf(noticia);
              this.listaNoticias.splice(index, 1);
              this.montarTabelaNoticias(this.listaNoticias);

              console.table(this.dataSource.data);
            });
        }
      });
  }
}
