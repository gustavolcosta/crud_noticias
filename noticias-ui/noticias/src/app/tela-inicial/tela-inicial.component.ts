import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-tela-inicial",
  templateUrl: "./tela-inicial.component.html",
  styleUrls: ["./tela-inicial.component.css"],
})
export class TelaInicialComponent implements OnInit {
  visualizarCadastrarNoticia = false;
  constructor() {}

  ngOnInit() {}

  habilitaCadastrarNoticia() {
    this.visualizarCadastrarNoticia = true;
  }
}
