import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'circular-progress-bar',
  templateUrl: './circular-progress-bar.component.html',
  styleUrls: ['./circular-progress-bar.component.scss']
})
export class CircularProgressBarComponent implements OnInit {
  @Input('progress') progress: number = 90;

  constructor() { }

  ngOnInit(): void {
  }

}
