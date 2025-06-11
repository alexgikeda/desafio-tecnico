import { ChangeDetectionStrategy, Component, Inject, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Contrato, ContratoService } from '../../../core/services/contrato.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertDialogComponent } from '../../../shared/alert-dialog/alert-dialog.component';

@Component({
  selector: 'app-formulario-contrato',
  standalone: false,
  templateUrl: './formulario-contrato.component.html',
  styleUrl: './formulario-contrato.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormularioContratoComponent {
  readonly dialog = inject(MatDialog);
  
  title!: string;
  contrato!: Contrato;
  option!: string;

  form: FormGroup = new FormGroup({
    nomeFilial: new FormControl('', [Validators.required]),
    plano: new FormControl('', Validators.required),
    dataInicio: new FormControl<Date | null>(null, Validators.required),
    dataVencimento: new FormControl<Date | null>(null, Validators.required),
    valorMensal: new FormControl('', Validators.required),
    status: new FormControl('', Validators.required),
  });

  constructor(@Inject(MAT_DIALOG_DATA) public data: { contrato: Contrato, title: string, option: string },
              private contratoService: ContratoService,
              private formDialog: MatDialogRef<FormularioContratoComponent>) 
  {
    this.title = data.title;
    this.contrato = data.contrato;
    this.option = data.option;
  } 
  
  updateForm(): void {
    this.form.patchValue({
      nomeFilial: this.contrato.nomeFilial,
      plano: this.contrato.plano,
      dataInicio: this.contrato.dataInicio,
      dataVencimento: this.contrato.dataVencimento,
      valorMensal: this.contrato.valorMensal,
      status: this.contrato.status
    });
  }

  onSubmit(): void {
    if (this.form.valid) {
      const dataForm = this.form.value;

      switch (this.option) {
        case 'add':
          this.add(this.contrato.operadoraId, dataForm);
          break;
        case 'edit':
          this.edit(this.contrato.id, dataForm);
          break;   
        default:
          break;
      }    
    }    
  }

  add(operadoraId: number, dataForm: any): void {
    this.contratoService.adicionarContrato(operadoraId, dataForm).subscribe({
      next: (res) => {
        this.formDialog.close(res);
        
        this.dialog.open(AlertDialogComponent, {
          data: { 
            title: 'Sucesso', 
            message: 'Contrato foi adicionado',
            button: 'Fechar'
          }             
        });        
      },
      error: () => {
        this.dialog.open(AlertDialogComponent, {
          data: { 
            title: 'Erro', 
            message: 'Erro ao adicionar Contrato',
            button: 'Fechar'
          }             
        });        
      }
    });      
  }
  
  edit(id: number, dataForm: any): void {
    this.contrato.nomeFilial = dataForm.nomeFilial;
    this.contrato.plano = dataForm.plano;
    this.contrato.dataInicio = dataForm.dataInicio;
    this.contrato.dataVencimento = dataForm.dataVencimento;
    this.contrato.valorMensal = dataForm.valorMensal;
    this.contrato.status = dataForm.status;   

    this.contratoService.editarContrato(id, this.contrato).subscribe({
      next: (res) => {
        this.formDialog.close(res);

        this.dialog.open(AlertDialogComponent, {
          data: { 
            title: 'Sucesso', 
            message: 'Contrato foi editado',
            button: 'Fechar'
          }             
        }); 
      },
      error: (err) => {
        this.dialog.open(AlertDialogComponent, {
          data: { 
            title: 'Erro', 
            message: 'Erro ao editar Contrato',
            button: 'Fechar'
          }             
        }); 
      }
    });       
  }  
}
