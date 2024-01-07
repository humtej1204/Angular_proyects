import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingComponent } from './loading/loading.component';
import { DialogComponent } from './dialog/dialog.component';
import { SnackbarComponent } from './snackbar/snackbar.component';
import { NavbarComponent } from './navbar/navbar.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MaterialModule } from '../material.module';
import { RouterModule } from '@angular/router';
import { CircularProgressBarComponent } from './circular-progress-bar/circular-progress-bar.component';



@NgModule({
  declarations: [
    DialogComponent,
    LoadingComponent,
    SnackbarComponent,
    NavbarComponent,
    CircularProgressBarComponent
  ],
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
    MaterialModule,
    RouterModule,
  ],
  exports: [
    DialogComponent,
    LoadingComponent,
    SnackbarComponent,
    NavbarComponent,
    CircularProgressBarComponent
  ]
})
export class ComponentsModule { }
