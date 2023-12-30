import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  private sidebarSwitch = new BehaviorSubject<boolean>(false);
  sidebarSwitch$ = this.sidebarSwitch.asObservable();

  private sidebarContent = new BehaviorSubject<any>(null);
  sidebarContent$ = this.sidebarContent.asObservable();

  /* To Comunicate data between Sidebar and ChildComponent */
  private dataToSidebar = new BehaviorSubject<any>(null);
  dataToSidebar$ = this.dataToSidebar.asObservable();

  private dataToChildComponent = new BehaviorSubject<any>(null);
  dataToChildComponent$ = this.dataToChildComponent.asObservable();

  constructor() { }

  public openSidebar() {
    this.sidebarSwitch.next(true);
  }

  public closeSidebar() {
    this.sidebarSwitch.next(false);
  }

  public setSidebarContent(component: any) {
    this.sidebarContent.next(component);
  }
}
