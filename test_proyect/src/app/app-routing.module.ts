import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommerceRedebanCrudComponent } from './views/commerce-redeban-crud/commerce-redeban-crud.component';
import { ComponentTestComponent } from './views/component-test/component-test.component';
import { TimerBlockTestComponent } from './views/timerBlock-test/timer-block-test.component';
import { LayoutTestComponent } from './views/layout-test/layout-test.component';
import { MainTestComponent } from './views/main-test/main-test.component';
import { RenderDataComponent } from './views/render-data/render-data.component';
import { GoogleMapsComponent } from './views/google-maps/google-maps.component';

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'layout/test'},
  {
    path: 'timerBlock',
    component: TimerBlockTestComponent,
  },
  {
    path: 'layout',
    component: LayoutTestComponent,
    children: [
      {
        path: 'test',
        component: MainTestComponent,
      },
      {
        path: 'tableData',
        component: RenderDataComponent,
      },
      {
        path: 'component',
        component: ComponentTestComponent,
      },
      {
        path: 'commerce',
        component: CommerceRedebanCrudComponent,
      },
      {
        path: 'maps',
        component: GoogleMapsComponent,
      },
    ]
  },
  {path: '**', pathMatch: 'full', redirectTo: 'auth'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
