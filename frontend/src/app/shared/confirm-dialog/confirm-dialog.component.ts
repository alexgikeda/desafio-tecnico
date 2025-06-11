import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { OperadoraService } from '../../core/services/operadora.service';

@Component({
  selector: 'app-confirm-dialog',
  standalone: false,
  templateUrl: './confirm-dialog.component.html',
  styleUrl: './confirm-dialog.component.scss'
})
export class ConfirmDialogComponent {
  title!: string;
  message!: string;

  constructor(@Inject(MAT_DIALOG_DATA) public data: { titulo: string, mensagem: string },
              private dialogRef: MatDialogRef<ConfirmDialogComponent>) 
  {
    this.title = data.titulo;
    this.message = data.mensagem;
  }

  confirm(): void {
    this.dialogRef.close(true);
  }
}
