import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ContainerComponent } from './components/container.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {NgxPaginationModule} from 'ngx-pagination';

import { FormatNamePipe } from './pipes/format-name.pipe';
import { FormatValueImagePipe } from './pipes/format-value-image.pipe';
import { FiltrarNombrePipe } from './pipes/filtrar-nombre.pipe';
import { DataAdminComponent } from './components/data-admin/data-admin.component';
import { EntityFormComponent } from './components/entity-form/entity-form.component';
import { FormatFormValuePipe } from './pipes/format-form-value.pipe';

@NgModule({
  declarations: [
    AppComponent,
    ContainerComponent,
    FormatNamePipe,
    FormatValueImagePipe,
    FiltrarNombrePipe,
    DataAdminComponent,
    EntityFormComponent,
    FormatFormValuePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
