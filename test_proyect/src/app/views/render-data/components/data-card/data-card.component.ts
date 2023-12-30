import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-data-card',
  templateUrl: './data-card.component.html',
  styleUrls: ['./data-card.component.scss']
})
export class DataCardComponent implements OnInit {
  @Input()
  selectedData: PeriodicElement = {} as PeriodicElement;

  constructor() { }

  ngOnInit(): void {
  }

}

interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
  img: string;
}