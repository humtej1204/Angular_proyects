import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-loading-window',
  templateUrl: './loading-window.component.html',
  styleUrls: ['./loading-window.component.scss']
})
export class LoadingWindowComponent implements OnInit {

  constructor(
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) { }

  ngOnInit(): void {
  }
}

export interface DialogData {
  msg: string,
}

