import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ILoadingDialogData } from 'src/app/models/dialog.model';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: ILoadingDialogData,
  ) { }
}
