import { DialogComponent } from "./dialog.component";
import { Injectable } from "@angular/core";

import { MatDialog } from "@angular/material";

@Injectable({
  providedIn: "root",
})
export class DialogService {
  constructor(public dialog: MatDialog) {}
}
