import { Injectable } from '@angular/core';
import { DialogBasicComponent } from './dialogBasic.component';
import { MatDialog } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class DialogBasicService {
  constructor(public dialog: MatDialog) {}

  mostrarErro(titulo, mensagem) {
    this.dialog.open(DialogBasicComponent, {
      data: {
        title: titulo,
        message: mensagem
      }
    });
  }
}
