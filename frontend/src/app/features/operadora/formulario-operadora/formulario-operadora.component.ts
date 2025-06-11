import { Component, inject, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Operadora, OperadoraService } from '../../../core/services/operadora.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertDialogComponent } from '../../../shared/alert-dialog/alert-dialog.component';

@Component({
  selector: 'app-formulario-operadora',
  standalone: false,
  templateUrl: './formulario-operadora.component.html',
  styleUrl: './formulario-operadora.component.scss'
})
export class FormularioOperadoraComponent {
  readonly dialog = inject(MatDialog);
  
  title!: string;
  operadoraForm!: Operadora;
  option!: string;

  form: FormGroup = new FormGroup({
    nome: new FormControl('', [Validators.required]),
    tipoServico: new FormControl('', Validators.required),
    contato: new FormControl('', Validators.required),
  });

  constructor(@Inject(MAT_DIALOG_DATA) public data: { operadora: Operadora, title: string, option: string },
              private operadoraService: OperadoraService,
              private formDialog: MatDialogRef<FormularioOperadoraComponent>) 
  {
    this.title = data.title;
    this.operadoraForm = data.operadora;
    this.option = data.option;
  }

  updateForm(): void {
    this.form.patchValue({
      nome: this.operadoraForm.nome,
      tipoServico: this.operadoraForm.tipoServico,
      contato: this.operadoraForm.contato
    });
  }

  onSubmit(): void {
    if (this.form.valid) {
      const dataForm = this.form.value;

      switch (this.option) {
        case 'add':
          this.add(dataForm);
          break;
        case 'edit':
          this.edit(this.operadoraForm.id, dataForm);
          break;   
        default:
          break;
      }    
    }    
  }

  add(dataForm: any): void {
    this.operadoraService.adicionarOperadora(dataForm).subscribe({
      next: (res) => {
        this.formDialog.close(res);
        
        this.dialog.open(AlertDialogComponent, {
          data: { 
            title: 'Sucesso', 
            message: 'Operadora foi adicionada',
            button: 'Fechar'
          }             
        });        
      },
      error: () => {
        this.dialog.open(AlertDialogComponent, {
          data: { 
            title: 'Erro', 
            message: 'Erro ao adicionar Operadora',
            button: 'Fechar'
          }             
        });        
      }
    });      
  }

  edit(operadoraId: number, dataForm: any): void {
    this.operadoraForm.nome = dataForm.nome;
    this.operadoraForm.tipoServico = dataForm.tipoServico;
    this.operadoraForm.contato = dataForm.contato;

    this.operadoraService.editarOperadora(operadoraId, this.operadoraForm).subscribe({
      next: (res) => {
        this.formDialog.close(res);

        this.dialog.open(AlertDialogComponent, {
          data: { 
            title: 'Sucesso', 
            message: 'Operadora foi editada',
            button: 'Fechar'
          }             
        }); 
      },
      error: (err) => {
        this.dialog.open(AlertDialogComponent, {
          data: { 
            title: 'Erro', 
            message: 'Erro ao editar Operadora',
            button: 'Fechar'
          }             
        }); 
      }
    });       
  }
}
