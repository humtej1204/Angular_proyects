import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-table-list',
  templateUrl: './table-list.component.html',
  styleUrls: ['./table-list.component.scss']
})
export class TableListComponent implements OnInit {  
  @Input()
  data: PeriodicElement[] = [];

  @Output()
  sendData = new EventEmitter<PeriodicElement>();

  constructor() { }

  ngOnInit(): void {
  }

  public sendDataToParent(selectedData: PeriodicElement) {
    this.sendData.emit(selectedData);
  }
}

interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
  img: string;
}