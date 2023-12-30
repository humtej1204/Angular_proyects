import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TimerBlockTestComponent } from './views/timerBlock-test/timer-block-test.component';
import { ComponentTestComponent } from './views/component-test/component-test.component';
import { SubcomponentTestComponent } from './views/component-test/subcomponent-test/subcomponent-test.component';
import { ItemsComponent } from './views/main-test/items/items.component';
import { MainTestComponent } from './views/main-test/main-test.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommerceRedebanCrudComponent } from './views/commerce-redeban-crud/commerce-redeban-crud.component';
import { HttpClientModule } from '@angular/common/http';

// Material Angular
import {A11yModule} from '@angular/cdk/a11y';
import {CdkAccordionModule} from '@angular/cdk/accordion';
import {ClipboardModule} from '@angular/cdk/clipboard';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {PortalModule} from '@angular/cdk/portal';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {CdkStepperModule} from '@angular/cdk/stepper';
import {CdkTableModule} from '@angular/cdk/table';
import {CdkTreeModule, getTreeControlMissingError} from '@angular/cdk/tree';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatBadgeModule} from '@angular/material/badge';
import {MatBottomSheetModule} from '@angular/material/bottom-sheet';
import {MatButtonModule} from '@angular/material/button';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatCardModule} from '@angular/material/card';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatChipsModule} from '@angular/material/chips';
import {MatStepperModule} from '@angular/material/stepper';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatDialogModule} from '@angular/material/dialog';
import {MatDividerModule} from '@angular/material/divider';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatListModule} from '@angular/material/list';
import {MatMenuModule} from '@angular/material/menu';
import {MatNativeDateModule, MatRippleModule} from '@angular/material/core';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatRadioModule} from '@angular/material/radio';
import {MatSelectModule} from '@angular/material/select';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatSliderModule} from '@angular/material/slider';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatSortModule} from '@angular/material/sort';
import {MatTableModule} from '@angular/material/table';
import {MatTabsModule} from '@angular/material/tabs';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatTreeModule} from '@angular/material/tree';
import {OverlayModule} from '@angular/cdk/overlay';
import {GoogleMapsModule} from '@angular/google-maps'

// Components
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CrearNitComponent } from './views/commerce-redeban-crud/actions-commerce-section/crear-nit/crear-nit.component';
import { DialogErrorComponent } from './views/commerce-redeban-crud/actions-commerce-section/dialog-error/dialog-error.component';
import { DialogSuccessComponent } from './views/commerce-redeban-crud/actions-commerce-section/dialog-success/dialog-success.component';
import { CrearTerminalComponent } from './views/commerce-redeban-crud/actions-commerce-section/crear-terminal/crear-terminal.component';
import { ConsultarCodigoUnicoComponent } from './views/commerce-redeban-crud/actions-commerce-section/consultar-codigo-unico/consultar-codigo-unico.component';
import { ConsultarUserComponent } from './views/commerce-redeban-crud/actions-commerce-section/consultar-usuario/consultar-usuario.component';
import { VincularUsuarioComponent } from './views/commerce-redeban-crud/actions-commerce-section/vincular-usuario/vincular-usuario.component';
import { DialogConfirmComponent } from './views/commerce-redeban-crud/actions-commerce-section/dialog-confirm/dialog-confirm.component';
import { LoadingWindowComponent } from './views/commerce-redeban-crud/actions-commerce-section/loading-window/loading-window.component';
import { LayoutTestComponent } from './views/layout-test/layout-test.component';
import { RenderDataComponent } from './views/render-data/render-data.component';
import { TableListComponent } from './views/render-data/components/table-list/table-list.component';
import { DataCardComponent } from './views/render-data/components/data-card/data-card.component';
import { GoogleMapsComponent } from './views/google-maps/google-maps.component';

@NgModule({
  declarations: [
    AppComponent,
    TimerBlockTestComponent,
    ComponentTestComponent,
    SubcomponentTestComponent,
    ItemsComponent,
    MainTestComponent,
    CommerceRedebanCrudComponent,
    ConsultarCodigoUnicoComponent,
    ConsultarUserComponent,
    CrearNitComponent,
    DialogErrorComponent,
    DialogSuccessComponent,
    CrearTerminalComponent,
    VincularUsuarioComponent,
    DialogConfirmComponent,
    LoadingWindowComponent,
    LayoutTestComponent,
    RenderDataComponent,
    TableListComponent,
    DataCardComponent,
    GoogleMapsComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    A11yModule,
    CdkAccordionModule,
    ClipboardModule,
    CdkStepperModule,
    CdkTableModule,
    CdkTreeModule,
    DragDropModule,
    MatAutocompleteModule,
    MatBadgeModule,
    MatBottomSheetModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatStepperModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatTreeModule,
    OverlayModule,
    PortalModule,
    ScrollingModule,
    HttpClientModule,
    GoogleMapsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
