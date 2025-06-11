import { Component, inject } from '@angular/core';
import { Operadora, OperadoraService } from '../../core/services/operadora.service';
import { MatDialog } from '@angular/material/dialog';
import { FormularioOperadoraComponent } from './formulario-operadora/formulario-operadora.component';
import { ConfirmDialogComponent } from '../../shared/confirm-dialog/confirm-dialog.component';
import { AlertDialogComponent } from '../../shared/alert-dialog/alert-dialog.component';

@Component({
  selector: 'app-operadora',
  standalone: false,
  templateUrl: './operadora.component.html',
  styleUrls: ['./operadora.component.scss'],
})
export class OperadoraComponent {
  readonly dialog = inject(MatDialog);
  title: string = "";
  message: string = "";
  option: string = "";

  dados: Operadora[] = [];
  columns: any[] = [{ key: 'id', header: 'ID' },
                    { key: 'nome', header: 'Nome' },
                    { key: 'tipoServico', header: 'Tipo de Serviço' },
                    { key: 'contato', header: 'Contato' }];                
  
  constructor(private operadoraService: OperadoraService) {}

  ngOnInit() {
    this.find();
  }

  find(): void {
    this.operadoraService.listarTodas().subscribe(data => {
      this.dados = data;
    });
  }

  add = () => {
    let row: Operadora = {id: 0, nome: '', tipoServico: '', contato: ''};
    this.title = 'Adicionar Operadora';
    this.option = 'add';
    this.openForm(row, this.title, this.option);
  };  
  
  view = (row: Operadora) => {
    this.title = 'Visualizar Operadora';
    this.option = 'view';
    this.openForm(row, this.title, this.option);
  };

  edit = (row: Operadora) => {
    this.title = 'Editar Operadora';
    this.option = 'edit';
    this.openForm(row, this.title, this.option);
  };
  
  delete = (row: Operadora) => {
    const confirmDialog = this.dialog.open(ConfirmDialogComponent, { 
      data: { 
        titulo: 'Excluir Operadora', 
        mensagem: `Tem certeza que deseja excluir "${row.nome}"?`
      } 
    });

    confirmDialog.afterClosed().subscribe(isConfirmed => {
      if (isConfirmed) {
        this.operadoraService.excluirOperadora(row.id).subscribe({
          next: () => {
            this.dialog.open(AlertDialogComponent, {
              data: { 
                title: 'Sucesso', 
                message: 'Operadora foi excluída',
                button: 'Fechar'
              }             
            });
            this.find();
          },
          error: () => {
            this.dialog.open(AlertDialogComponent, {
              data: { 
                title: 'Erro', 
                message: 'Erro ao excluir Operadora',
                button: 'Fechar'
              }             
            });          
          }        
        });
      }
    });
  };

  openForm(row: Operadora, title: string, option: string) {
    const formDialog = this.dialog.open(FormularioOperadoraComponent, { data: { operadora: row, title: title, option: option }, minWidth: 500 });

    formDialog.afterOpened().subscribe(() => {
      const instance = formDialog.componentInstance;
      instance.updateForm();

      if (option === 'view')
        instance.form.disable();
    });

    formDialog.afterClosed().subscribe(() => {
      this.find();
    });
  }

}
