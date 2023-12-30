import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-render-data',
  templateUrl: './render-data.component.html',
  styleUrls: ['./render-data.component.scss']
})
export class RenderDataComponent implements OnInit {
  public dataList: PeriodicElement[] = fakeData;
  public selectedData: PeriodicElement = {} as PeriodicElement;

  constructor() { }

  ngOnInit(): void {
  }

  public setSelectedData(event: PeriodicElement) {
    this.selectedData = event;
  }
}

interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
  img: string;
}

const fakeData: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H', img: ''},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He', img: ''},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li', img: ''},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be', img: ''},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B', img: ''},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C', img: ''},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N', img: ''},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O', img: ''},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F', img: ''},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne', img: ''},
]
