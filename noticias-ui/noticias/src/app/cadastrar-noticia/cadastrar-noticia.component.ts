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

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private noticiaService: NoticiaService,
    private alertService: AlertService
  ) {}

  ngOnInit() {
    this.montarFormulario();
  }

  salvarNoticia() {
    if (this.formInput.valid) {
      const noticiaForm = {
        titulo: this.formInput.value.titulo,
        conteudo: this.formInput.value.conteudo,
        dataPublicacao: this.formInput.value.dataPublicacao,
      };

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

      this.router.navigate([""]);
    }
  }

  montarFormulario() {
    this.formInput = this.formBuilder.group({
      titulo: new FormControl(null, Validators.required),
      conteudo: new FormControl(null, Validators.required),
      dataPublicacao: new FormControl(null, Validators.required),
    });
  }
}
