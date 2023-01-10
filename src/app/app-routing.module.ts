import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {LoginComponent} from "./content/form/login/login.component";
import {SignupComponent} from "./content/form/signup/signup.component";
import {ProfileComponent} from "./content/profile/profile.component";
import {UserGagesComponent} from "./content/user-gages/user-gages.component";
import {UserGagesDataComponent} from "./content/user-gages-data/user-gages-data.component";
import {AllFlatComponent} from "./content/all-flat/all-flat.component";
import {AllGageComponent} from "./content/all-gage/all-gage.component";

const routes: Routes = [
 { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: 'login', component: LoginComponent },
  { path: 'sign-up', component: SignupComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'user-gages', component: UserGagesComponent },
  { path: 'user-gages-data', component: UserGagesDataComponent },
  { path: 'all-flat', component: AllFlatComponent },
  { path: 'all-gage', component: AllGageComponent },
  { path: 'sign-out', redirectTo: 'login'  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
