import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {HeaderComponent} from './header/header.component';
import {SideNavComponent} from './side-nav/side-nav.component';
import {RouterOutlet} from "@angular/router";
import {AppRoutingModule} from "./_helpers/app-routing.module";
import {LoginComponent} from './content/form/login/login.component';
import {SignupComponent} from './content/form/signup/signup.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {httpInterceptorProviders} from "./_helpers/http.interceptor";
import {AgGridModule} from "ag-grid-angular";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {FormControlComponent} from "./content/form/form-control/form-control.component";
import { UserGagesComponent } from './content/user-gages/user-gages.component';
import {ProfileComponent} from "./content/profile/profile.component";
import { AllFlatComponent } from './content/all-flat/all-flat.component';
import { AllGageComponent } from './content/all-gage/all-gage.component';
import {UserGagesDataComponent} from "./content/user-gages-data/user-gages-data.component";
import { UserClaimsComponent } from './content/user-claims/user-claims.component';
import { AllClaimsComponent } from './content/all-claims/all-claims.component';
import { AllGageDataComponent } from './content/all-gage-data/all-gage-data.component';
import { AllUserComponent } from './content/all-user/all-user.component';
import { AllContractComponent } from './content/all-contract/all-contract.component';
import { ResetPasswordComponent } from './content/form/reset-password/reset-password.component';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SideNavComponent,
    LoginComponent,
    SignupComponent,
    FormControlComponent,
    ProfileComponent,
    UserGagesComponent,
    UserGagesDataComponent,
    AllFlatComponent,
    AllGageComponent,
    UserClaimsComponent,
    AllClaimsComponent,
    AllGageDataComponent,
    AllUserComponent,
    AllContractComponent,
    ResetPasswordComponent,
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
