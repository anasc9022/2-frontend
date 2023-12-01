import { Injector, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { IndustryListComponent } from './components/industry-list/industry-list.component';
import { HttpClientModule } from '@angular/common/http';
import { IndustryService } from './services/industry.service';
import { Routes, RouterModule, Router } from '@angular/router';
import { IndustrialCategoryMenuComponent } from './components/industrial-category-menu/industrial-category-menu.component';
import { SearchComponent } from './components/search/search.component';
import { IndustryDetailsComponent } from './components/industry-details/industry-details.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './components/login/login.component';
import { LoginStatusComponent } from './components/login-status/login-status.component';
import myAppConfig from './config/my-app-config';
import { OktaAuth } from '@okta/okta-auth-js';
import { OktaCallbackComponent, OktaAuthModule, OKTA_CONFIG, OktaAuthGuard } from '@okta/okta-angular';
import { AdminComponent } from './components/admin/admin.component';
import { RegisterComponent } from './components/register/register.component';

const oktaConfig = myAppConfig.oidc;

const oktaAuth = new OktaAuth(oktaConfig);

function sendToLoginPage(oktaAuth: OktaAuth, injector: Injector) {

  const router = injector.get(Router);

  router.navigate(['/login']);
}

const routes: Routes = [
  {path: 'admin', component: AdminComponent, canActivate: [OktaAuthGuard],
                  data: {onAuthRequired: sendToLoginPage}},
  {path: 'login/callback', component: OktaCallbackComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'checkout', component: CheckoutComponent},
  {path: 'industries/:id', component: IndustryDetailsComponent},
  {path: 'search/:keyword', component: IndustryListComponent},
  {path: 'category/:id', component: IndustryListComponent},
  {path: 'category', component: IndustryListComponent},
  {path: 'Industries', component: IndustryListComponent},
  {path: '', redirectTo: '/Industries', pathMatch: 'full'},
  {path: '**', redirectTo: '/Industries', pathMatch: 'full'}
];

@NgModule({
  declarations: [
    AppComponent,
    IndustryListComponent,
    IndustrialCategoryMenuComponent,
    SearchComponent,
    IndustryDetailsComponent,
    CheckoutComponent,
    LoginComponent,
    LoginStatusComponent,
    AdminComponent,
    RegisterComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    OktaAuthModule,
    FormsModule
  ],
  providers: [IndustryService, { provide: OKTA_CONFIG, useValue: { oktaAuth }}],
  bootstrap: [AppComponent]
})
export class AppModule { }
