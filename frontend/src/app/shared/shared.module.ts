import { LOCALE_ID, NgModule } from '@angular/core';
import { AsyncPipe, CommonModule, registerLocaleData } from '@angular/common';

// Angular Material components
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSortModule } from '@angular/material/sort';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { TableListComponent } from './table-list/table-list.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { AlertDialogComponent } from './alert-dialog/alert-dialog.component';
import { UppercaseDirective } from './uppercase/uppercase.directive';
import localePt from '@angular/common/locales/pt';

registerLocaleData(localePt);

const materialModules = [
  MatToolbarModule,
  MatCardModule,
  MatButtonModule,
  MatTableModule,
  MatPaginatorModule,
  MatIconModule,
  MatInputModule,
  MatFormFieldModule,
  MatSelectModule,
  MatSnackBarModule,
  MatDialogModule,
  MatSidenavModule,
  MatListModule,
  MatProgressSpinnerModule,
  MatSortModule,
  MatCheckboxModule,
  MatRadioModule,
  MatMenuModule,
  MatDividerModule,
  MatTooltipModule,
  MatGridListModule,
  MatTabsModule,
  MatDatepickerModule,
  MatNativeDateModule
];

@NgModule({
  declarations: [
    TableListComponent,
    ToolbarComponent,
    ConfirmDialogComponent,
    AlertDialogComponent,
    UppercaseDirective
  ],
  imports: [
    ...materialModules,
    CommonModule,
    RouterModule,
    AsyncPipe,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    ...materialModules,
    TableListComponent,
    ToolbarComponent,
    AsyncPipe,
    FormsModule,
    ReactiveFormsModule,
    ConfirmDialogComponent,
    AlertDialogComponent,
    UppercaseDirective
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'pt-BR' }
  ]
})
export class SharedModule { }
