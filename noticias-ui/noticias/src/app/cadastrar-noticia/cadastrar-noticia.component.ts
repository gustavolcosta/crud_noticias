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
    private alertService: AlertService
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
          });
      } else {
        this.noticiaService.salvarNoticia(noticiaForm).subscribe(
          (resposta) => {
            this.noticia = resposta;
            console.log(this.noticia);
            this.alertService.showMessage(
              "Noticia adicionada com sucesso!",
              "success"
            );
          },
          (err) => {
            this.alertService.showMessage(
              "Houve um erro ao adicionar a noticia",
              "danger"
            );
          }
        );
      }

      this.router.navigate(["/buscar-noticias"]);
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
