import { Component, inject } from '@angular/core';
import { Contrato, ContratoService } from '../../core/services/contrato.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../shared/confirm-dialog/confirm-dialog.component';
import { AlertDialogComponent } from '../../shared/alert-dialog/alert-dialog.component';
import { FormularioContratoComponent } from './formulario-contrato/formulario-contrato.component';
import { Operadora, OperadoraService } from '../../core/services/operadora.service';
import { MatSelectChange } from '@angular/material/select';

@Component({
  selector: 'app-contrato',
  standalone: false,
  templateUrl: './contrato.component.html',
  styleUrls: ['./contrato.component.scss'],  
})
export class ContratoComponent {
  readonly dialog = inject(MatDialog);
  title: string = "";
  message: string = "";
  option: string = "";
  selectedOperadora!: number;

  dados: Contrato[] = [];
  columns: any[] = [{ key: 'id', type: 'number', header: 'ID' },
                    { key: 'nomeFilial', type: 'string', header: 'Nome da Filial' },
                    { key: 'plano', type: 'string', header: 'Plano Contratado' },
                    { key: 'dataInicio', type: 'date', header: 'Data de Início' },
                    { key: 'dataVencimento', type: 'date', header: 'Data de Vencimento' },
                    { key: 'valorMensal', type: 'currency', header: 'Valor Mensal' },
                    { key: 'status', type: 'string', header: 'Status' },
                    { key: 'operadoraId', type: 'number', header: 'Operadora ID' },
                  ];
                  
  operadoras: Operadora[] = [];                  

  constructor(private contratoService: ContratoService,
              private operadoraService: OperadoraService
  ) { }   

  ngOnInit() {
    this.loadSelectOperadora();
  }
  
  find(): void {
    this.contratoService.listarTodas().subscribe(data => {
      this.dados = data;
    });
  }

  listarContratosPorOperadora(): void {
    this.contratoService.listarContratosPorOperadoraId(this.selectedOperadora).subscribe(data => {
      this.dados = data;
    });
  }

  loadSelectOperadora(): void {
    this.operadoraService.listarTodas().subscribe(data => {
      this.operadoras = data;
      
      if (this.operadoras.length > 0) {
        this.selectedOperadora = this.operadoras[0].id;
        this.listarContratosPorOperadora();
      }
    });
  }

  onOperadoraChange(event: MatSelectChange): void {
    this.listarContratosPorOperadora();
  }  

  add = () => {
    if (this.operadoras.length == 0) {
      this.dialog.open(AlertDialogComponent, {
        data: { 
          title: 'Alerta', 
          message: 'Adicione uma operadora para continuar',
          button: 'Fechar'
        }             
      });
      return;
    }

    let row: Contrato = {id: 0,
                        nomeFilial: '', 
                        plano: '', 
                        dataInicio: new Date(),
                        dataVencimento: new Date(),
                        valorMensal: null,
                        status: '',
                        operadoraId: this.selectedOperadora};

    this.title = 'Adicionar Contrato';
    this.option = 'add';
    this.openForm(row, this.title, this.option);
  };  
  
  view = (row: Contrato) => {
    this.title = 'Visualizar Contrato';
    this.option = 'view';
    this.openForm(row, this.title, this.option);
  };

  edit = (row: Contrato) => {
    this.title = 'Editar Contrato';
    this.option = 'edit';
    this.openForm(row, this.title, this.option);
  };
  
  delete = (row: Contrato) => {
    const confirmDialog = this.dialog.open(ConfirmDialogComponent, { 
      data: { 
        titulo: 'Excluir Contrato', 
        mensagem: `Tem certeza que deseja excluir o Contrato?`
      } 
    });

    confirmDialog.afterClosed().subscribe(isConfirmed => {
      if (isConfirmed) {
        this.contratoService.excluirContrato(row.id).subscribe({
          next: () => {
            this.dialog.open(AlertDialogComponent, {
              data: { 
                title: 'Sucesso', 
                message: 'Contrato foi excluído',
                button: 'Fechar'
              }             
            });
            this.listarContratosPorOperadora();
          },
          error: () => {
            this.dialog.open(AlertDialogComponent, {
              data: { 
                title: 'Erro', 
                message: 'Erro ao excluir Contrato',
                button: 'Fechar'
              }             
            });          
          }        
        });
      }
    });
  };

  openForm(row: Contrato, title: string, option: string) {    
    const formDialog = this.dialog.open(FormularioContratoComponent, { data: { contrato: row, title: title, option: option }, minWidth: 500 });

    formDialog.afterOpened().subscribe((res) => {
      const instance = formDialog.componentInstance;
      instance.updateForm();

      if (option === 'view') {
        instance.form.disable();
      }
    });

    formDialog.afterClosed().subscribe((res) => {
      this.listarContratosPorOperadora();
    });
  }
}
