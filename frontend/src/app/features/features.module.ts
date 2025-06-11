import { NgModule } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CoreModule } from '../core/core.module';
import { SharedModule } from '../shared/shared.module';
import { HomeComponent } from './home/home.component';
import { OperadoraComponent } from './operadora/operadora.component';
import { ContratoComponent } from './contrato/contrato.component';
import { FormularioOperadoraComponent } from './operadora/formulario-operadora/formulario-operadora.component';
import { FormularioContratoComponent } from './contrato/formulario-contrato/formulario-contrato.component';

@NgModule({
  declarations: [
    HomeComponent,
    OperadoraComponent,
    ContratoComponent,
    FormularioOperadoraComponent,
    FormularioContratoComponent,
  ],
  imports: [
    CommonModule, 
    RouterModule,
    CoreModule,
    SharedModule, 
  ],
  providers: [
    CurrencyPipe,
  ],  
})
export class FeaturesModule { }
