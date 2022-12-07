import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {HomeComponent} from "./content/home/home.component";
import {AnalyticsComponent} from "./content/analytics/analytics.component";
import {SettingComponent} from "./content/setting/setting.component";
import {AboutComponent} from "./content/about/about.component";
import {LoginComponent} from "./content/login/login.component";
import {SignupComponent} from "./content/signup/signup.component";

const routes: Routes = [
 { path: '', pathMatch: 'full', redirectTo: 'home' },
 // { path: '', component: AppComponent },
 { path: 'home', component: HomeComponent },
 { path: 'analytics', component: AnalyticsComponent },
  { path: 'setting', component: SettingComponent },
 { path: 'about', component: AboutComponent },
  { path: 'login', component: LoginComponent },
  { path: 'sign-up', component: SignupComponent },
  { path: 'sign-out', redirectTo: 'login'  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
