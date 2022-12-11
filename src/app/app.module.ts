import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {HeaderComponent} from './header/header.component';
import {SideNavComponent} from './side-nav/side-nav.component';
import {HomeComponent} from './content/home/home.component';
import {AnalyticsComponent} from './content/analytics/analytics.component';
import {SettingComponent} from './content/setting/setting.component';
import {AboutComponent} from './content/about/about.component';
import {RouterOutlet} from "@angular/router";
import {AppRoutingModule} from "./app-routing.module";
import {LoginComponent} from './content/form/login/login.component';
import {SignupComponent} from './content/form/signup/signup.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {httpInterceptorProviders} from "./_helpers/http.interceptor";
import { CellCustomComponent } from './content/home/cell-custom/cell-custom.component';
import {AgGridModule} from "ag-grid-angular";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {FormControlComponent} from "./form-control/form-control.component";
import { ProfileComponent } from './profile/profile.component';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SideNavComponent,
    HomeComponent,
    AnalyticsComponent,
    SettingComponent,
    AboutComponent,
    LoginComponent,
    SignupComponent,
    CellCustomComponent,
    FormControlComponent,
    ProfileComponent,
  ],
  imports: [
    RouterOutlet,
    HttpClientModule,
    AppRoutingModule,
    AgGridModule,
    NgbModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [httpInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule {
}
