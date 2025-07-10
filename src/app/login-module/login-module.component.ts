import { Component } from '@angular/core';
import { LoginService } from '../login.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login-module',
  standalone: false,
  templateUrl: './login-module.component.html',
  styleUrl: './login-module.component.css'
})
export class LoginModuleComponent {
  email: string = '';
  password: string = '';
  message: string = '';
  isFlipped: boolean = false;
  bLogin: boolean = false;
  memberId: any;
  userId: any;
  returnedUserid = '';
  constructor(private loginService: LoginService, private router: Router) { }
 
  login(): void {
    this.message = '';
    this.bLogin=true;
    // if (this.email === 'admin@gmail.com' && this.password === 'admin') {
      // this.memberId=this.findMemberIdByEmail(this.email);
      this.loginService.findMemberIdByEmail(this.email).subscribe({
        next:(data)=>{this.memberId=data;
          console.log("member id fetched is:"+this.memberId);
          // sessionStorage.setItem('loggedin','true')
          sessionStorage.setItem('User Id',this.memberId);
          console.log("User id in login()"+this.memberId);
          if (this.email === 'admin@gmail.com' && this.password === 'admin') {
          this.router.navigate(['/admin_dashboard']);}
          else{
            this.loginService.login(this.email, this.password).subscribe({
              next: (response) => {
                if (response === 'Active user') {
                  this.loginService.findMemberIdByEmail(this.email).subscribe({
                    next:(data)=>{this.memberId=data;
                      console.log("member id fetched is:"+this.memberId);
                      // sessionStorage.setItem('loggedin','true');
                      sessionStorage.setItem('User Id',this.memberId);
                      console.log("User id in login()"+this.memberId);
                      this.router.navigate(['/book_transaction']);
                      // this.BookTransactionObj.sendMemberId(this.memberId);
                    },
                    error:(err)=>console.log("Error"),
                    complete:()=>console.log("Found Member Id")
                  });
                } else {
                  this.message = 'Inactive user';
                }
              },
              error: (err) => {
                if (err.status === 401) {
                  this.message = 'Invalid user';
                } else {
                  this.message = 'Inactive user';
                }
              }
            });
          }
        },
        error:(err)=>console.log("Error"),
        complete:()=>console.log("Found Member Id")
       });
      }
  goToRegister(): void {
    this.router.navigate(['/user_crud'], { queryParams: { action: 'add' } });
  }
 
  toggleFlip(): void {
    this.isFlipped = !this.isFlipped;
  }
 
}
