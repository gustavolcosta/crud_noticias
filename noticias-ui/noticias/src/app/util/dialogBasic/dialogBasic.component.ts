import {
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  Output,
  EventEmitter,
  Inject
} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-dialog-basic',
  templateUrl: 'dialogBasic.component.html',
  styleUrls: ['./dialogBasic.component.scss']
})
export class DialogBasicComponent implements OnChanges {
  @Input() public showModal: boolean;

  @Output() closeModal = new EventEmitter<boolean>();

  constructor(
    public dialogRef: MatDialogRef<DialogBasicComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnChanges(changes: SimpleChanges) {}

  fecharModal() {
    this.dialogRef.close();
  }
}
