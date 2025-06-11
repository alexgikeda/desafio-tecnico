import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ToolbarComponent } from './shared/toolbar/toolbar.component';
import { HomeComponent } from './features/home/home.component';
import { OperadoraComponent } from './features/operadora/operadora.component';
import { ContratoComponent } from './features/contrato/contrato.component';

const routes: Routes = [
  {
    path: '',
    component: ToolbarComponent,
    children: [
      { path: 'Home', component: HomeComponent },
      { path: 'Operadora', component: OperadoraComponent },
      { path: 'Contrato', component: ContratoComponent },
      { path: '', redirectTo: 'Home', pathMatch: 'full' },
      { path: '**', redirectTo: 'Home' },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
