import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {LoginComponent} from "../content/form/login/login.component";
import {SignupComponent} from "../content/form/signup/signup.component";
import {ProfileComponent} from "../content/profile/profile.component";
import {UserGagesComponent} from "../content/user-gages/user-gages.component";
import {UserGagesDataComponent} from "../content/user-gages-data/user-gages-data.component";
import {AllFlatComponent} from "../content/all-flat/all-flat.component";
import {AllGageComponent} from "../content/all-gage/all-gage.component";
import {UserClaimsComponent} from "../content/user-claims/user-claims.component";
import {AllGageDataComponent} from "../content/all-gage-data/all-gage-data.component";
import {AllUserComponent} from "../content/all-user/all-user.component";
import {AllClaimsComponent} from "../content/all-claims/all-claims.component";
import {AllContractComponent} from "../content/all-contract/all-contract.component";
import {ResetPasswordComponent} from "../content/form/reset-password/reset-password.component";

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: 'login', component: LoginComponent },
  { path: 'sign-up', component: SignupComponent },
  { path: 'reset-password', component: ResetPasswordComponent },
  { path: 'sign-out', redirectTo: 'login'  },
  { path: 'profile', component: ProfileComponent },
  { path: 'user-gages', component: UserGagesComponent },
  { path: 'user-gages-data', component: UserGagesDataComponent },
  { path: 'user-claims', component: UserClaimsComponent },
  { path: 'all-flat', component: AllFlatComponent },
  { path: 'all-contract', component: AllContractComponent },
  { path: 'all-gage', component: AllGageComponent },
  { path: 'all-user', component: AllUserComponent },
  { path: 'all-gage-data', component: AllGageDataComponent },
  { path: 'all-claims', component: AllClaimsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
