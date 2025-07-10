import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginModuleComponent } from './login-module/login-module.component';
import { UserCrudComponent } from './user-crud/user-crud.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { BookCrudComponent } from './book-crud/book-crud.component';
import { BookTransactionComponent } from './book-transaction/book-transaction.component';
import { LibraryCrudComponent } from './library-crud/library-crud.component';
import { PaymentComponent } from './payment/payment.component';
import { LandingPageComponent } from './landing-page/landing-page.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginModuleComponent,
    UserCrudComponent,
    AdminDashboardComponent,
    BookCrudComponent,
    BookTransactionComponent,
    LibraryCrudComponent,
    PaymentComponent,
    LandingPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
