import { AlertService } from "./../service/alert/alert.service";
import { NoticiaService } from "./../service/noticia.service";
import { Noticia } from "./../model/Noticia";
import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from "@angular/forms";
import { MatDialog } from "@angular/material";
import { DialogBasicComponent } from "../util/dialogBasic/dialogBasic.component";

@Component({
  selector: "app-cadastrar-noticia",
  templateUrl: "./cadastrar-noticia.component.html",
  styleUrls: ["./cadastrar-noticia.component.css"],
})
export class CadastrarNoticiaComponent implements OnInit {
  formInput: FormGroup;
  noticia: Noticia;
  idNoticia: number;
  operacao: string;
  modoEdicao = false;
  modoVisualizacao = false;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private noticiaService: NoticiaService,
    private alertService: AlertService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.montarFormulario();
    this.verificarURL();
  }

  salvarNoticia() {
    if (this.formInput.valid) {
      const noticiaForm = {
        titulo: this.formInput.value.titulo,
        conteudo: this.formInput.value.conteudo,
        dataPublicacao: this.formInput.value.dataPublicacao,
      };

      if (this.modoEdicao) {
        this.noticiaService
          .alterarNoticia(this.idNoticia, noticiaForm)
          .subscribe((resultado) => {
            this.noticia = resultado;

            this.dialog
              .open(DialogBasicComponent, {
                data: {
                  title: "",
                  message: "Alteração realizada com sucesso!",
                },
              })
              .afterClosed()
              .subscribe((resultado) => {
                this.router.navigate(["/buscar-noticias"]);
              });
          });
      } else {
        //Modo cadastrar
        this.noticiaService.salvarNoticia(noticiaForm).subscribe(
          (resposta) => {
            this.noticia = resposta;

            this.dialog
              .open(DialogBasicComponent, {
                data: {
                  title: "",
                  message: "Noticia adicionada com sucesso!",
                },
              })
              .afterClosed()
              .subscribe((resultado) => {
                this.router.navigate(["/buscar-noticias"]);
              });
          },
          (err) => {
            this.dialog.open(DialogBasicComponent, {
              data: {
                title: "",
                message: "Houve um erro ao cadastrar a noticia!",
              },
            });
          }
        );
      }
    }
  }

  montarFormulario() {
    this.formInput = this.formBuilder.group({
      titulo: new FormControl(null, Validators.required),
      conteudo: new FormControl(null, Validators.required),
      dataPublicacao: new FormControl(null, Validators.required),
    });
  }

  verificarURL() {
    //Atribui ao idNoticia o id passado como parâmetro
    this.activatedRoute.params.subscribe(
      (params) => (this.idNoticia = params.id ? params.id : 0)
    );

    //Atribui o tipo de operação desejada (Cadastro, Edição ou Visualização)
    this.activatedRoute.pathFromRoot[1].url.subscribe(
      (val) => (this.operacao = val[1] ? val[1].path : "")
    );

    if (this.operacao === "editar") {
      this.modoEdicao = true;
      this.buscaNoticia();
    }

    if (this.operacao === "visualizar") {
      this.modoVisualizacao = true;
      this.buscaNoticia();
    }
  }

  atribuirValoresFormulario(noticia) {
    this.formInput.get("titulo").setValue(noticia.titulo);
    this.formInput.get("conteudo").setValue(noticia.conteudo);
    this.formInput.get("dataPublicacao").setValue(noticia.dataPublicacao);
  }

  buscaNoticia() {
    this.noticiaService
      .buscarNoticiaPorId(this.idNoticia)
      .subscribe((resultado) => {
        this.noticia = resultado;
        this.atribuirValoresFormulario(this.noticia);
      });
  }
}
