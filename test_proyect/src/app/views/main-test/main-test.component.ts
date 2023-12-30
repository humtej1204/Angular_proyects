import { Component, OnInit } from '@angular/core';
import { SidebarService } from 'src/app/services/sidebar-service.service';
import { TimerBlockTestComponent } from '../timerBlock-test/timer-block-test.component';

@Component({
  selector: 'app-main-test',
  templateUrl: './main-test.component.html',
  styleUrls: ['./main-test.component.scss']
})
export class MainTestComponent implements OnInit {

  constructor(
    private sidebarService: SidebarService,
  ) { }

  ngOnInit(): void {
  }

  public openSidebar() {
    this.sidebarService.setSidebarContent(TimerBlockTestComponent);
    this.sidebarService.openSidebar();
  }
}
