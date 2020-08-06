import { Injectable } from "@angular/core";
declare const $: any;

@Injectable({
  providedIn: "root",
})
export class AlertService {
  constructor() {}

  showMessage(message, typeMessage) {
    let from = "top";
    let align = "left";
    let type = "info";
    align = "center";
    from = "bottom";
    type = typeMessage;
    $.notify(
      {
        message: "<b>" + message + "</b>",
      },
      {
        placement: { from, align },
        offset: { x: 20, y: 35 },
        type,
        template: `<div class="alert alert-{0} alert-with-icon col-lg-4">
          <i class="material-icons alert-icon">notifications</i>
          <button class="close" type="button" data-dismiss="alert" aria-label="Close"><i class="material-icons">close</i></button>
          <span>{2}</span>
        </div>`,
      }
    );
  }
}
