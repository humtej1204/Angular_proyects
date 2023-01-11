import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommerceRedebanCrudComponent } from './views/commerce-redeban-crud/commerce-redeban-crud.component';
import { ComponentTestComponent } from './views/component-test/component-test.component';
import { TimerBlockTestComponent } from './views/timerBlock-test/timer-block-test.component';

const routes: Routes = [
  {
    path: 'timerBlock',
    component: TimerBlockTestComponent,
  },
  {
    path: 'component',
    component: ComponentTestComponent,
  },
  {
    path: 'commerce',
    component: CommerceRedebanCrudComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
