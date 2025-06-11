import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-alert-dialog',
  standalone: false,
  templateUrl: './alert-dialog.component.html',
  styleUrl: './alert-dialog.component.scss'
})
export class AlertDialogComponent {
  title!: string;
  message!: string;
  button!: string;

  data = inject(MAT_DIALOG_DATA);

  constructor() {
    this.title = this.data.title ? this.data.title : this.title;
    this.message = this.data.message ? this.data.message : this.message;
    this.button = this.data.button ? this.data.button : this.button;    
  }
}
