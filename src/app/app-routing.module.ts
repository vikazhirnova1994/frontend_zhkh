import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {HomeComponent} from "./home/home.component";
import {AnalyticsComponent} from "./analytics/analytics.component";
import {SettingComponent} from "./setting/setting.component";
import {AboutComponent} from "./about/about.component";
import {LoginComponent} from "./login/login.component";
import {SignupComponent} from "./signup/signup.component";

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
