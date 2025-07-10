import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserCrudComponent } from './user-crud/user-crud.component';
import { LoginModuleComponent } from './login-module/login-module.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { BookCrudComponent } from './book-crud/book-crud.component';
import { BookTransactionComponent } from './book-transaction/book-transaction.component';
import { LibraryCrudComponent } from './library-crud/library-crud.component';
import { PaymentComponent } from './payment/payment.component';
import { LandingPageComponent } from './landing-page/landing-page.component';

const routes: Routes = [
  {path:'',component:LandingPageComponent},
  {path:'login',component:LoginModuleComponent},
  {path:'user_crud',component: UserCrudComponent},
  {path:'admin_dashboard',component:AdminDashboardComponent},
  {path:'book_crud',component:BookCrudComponent},
  {path:'book_transaction',component:BookTransactionComponent},
  {path:'library_crud',component:LibraryCrudComponent},
  {path:'payment',component:PaymentComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
