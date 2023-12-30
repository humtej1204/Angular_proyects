import { Component, OnInit } from '@angular/core';
import { SidebarService } from 'src/app/services/sidebar-service.service';

@Component({
  selector: 'app-layout-test',
  templateUrl: './layout-test.component.html',
  styleUrls: ['./layout-test.component.scss']
})
export class LayoutTestComponent implements OnInit {
  public sidebarStatus: boolean = false;
  public sidebarContent: any;

  constructor(
    private sidebarService: SidebarService,
  ) { }

  ngOnInit(): void {
    this.sidebarService.sidebarSwitch$
    .subscribe((value: boolean) => {
      this.sidebarStatus = value;
    });

    this.sidebarService.sidebarContent$
    .subscribe((component: any) => {
      this.sidebarContent = component;
    });
  }

}
