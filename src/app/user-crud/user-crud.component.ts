import { Component } from '@angular/core';
import { member } from '../member';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';
import { UserCrudRestService } from '../user-crud-rest.service';
 
 
 
@Component({
  selector: 'app-user-crud',
  standalone: false,
  templateUrl: './user-crud.component.html',
  styleUrl: './user-crud.component.css'
})
 
export class UserCrudComponent {
 
  isRegisterOnly = false;
  displayAddMemberForm = false;
  bDisplayAddOrEditRecord = false;
  strDisplayHeaderTagForAddOrEdit = "Register";

  membersLst: any[] = [];
  memberForm!: FormGroup;

  goBack() {

    if (this.displayAddMemberForm) {
      // You're in the form view → go back to main screen
      this.displayAddMemberForm = false;
      this.bDisplayAddOrEditRecord = false;
    } else {
      // You're in the main screen → go to admin dashboard
       this.router.navigate(['/admin_dashboard']);
    }
  }

  goBackFromRegister() {
    this.router.navigate(['']);
  }
  


  getAllStudents() {

    this.restService.getAllStudents().subscribe({
      next: (data) => { this.membersLst = data; console.log(data) },
      error: (err) => alert(err),
      complete: () => console.log("Get is completed")
    });
  }

  addMemberRecord(isRegister: boolean = false) {
    this.isRegisterOnly = isRegister;
    this.bDisplayAddOrEditRecord = true;
    this.strDisplayHeaderTagForAddOrEdit = isRegister ? "REGISTER" : "ADD MEMBER";
    this.displayAddMemberForm = true;

    this.memberForm.patchValue({
      memberId: '',
      name: '',
      email: '',
      phone: '',
      address: '',
      password: '',
      loginDate: isRegister ? new Date().toISOString().substring(0, 10) : '',
      membershipStatus: isRegister ? 'Active' : '',
    });
  }

  constructor(private fb: FormBuilder, private restService: UserCrudRestService, private cdr: ChangeDetectorRef, private route: ActivatedRoute, private router: Router) {

    // This creates a Reactive Form with validation rules:
    this.memberForm = this.fb.group({
      memberId: [''],
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      address: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      loginDate: [''],
      membershipStatus: [''],
      lastRenewedDate: ['']
    });

    //  Subscribes to the query parameters in the URL.
    // If the URL contains ?action=add, it:
    // Calls addMemberRecord(true) to open the form in register mode.
    // Sets isRegisterOnly = true to adjust the UI accordingly.

    this.route.queryParams.subscribe(params => {
      if (params['action'] == 'add') {
        this.addMemberRecord(true);
        this.isRegisterOnly = true;
      }
    });
  }


  AddOrEditRecord() {

    // This ensures that validation messages appear even if the user hasn’t interacted with the fields.
    Object.values(this.memberForm.controls).forEach(control => {
      control.markAsTouched(); // This tells Angular: “Pretend the user has interacted with this field.”
    });

    if (this.memberForm.invalid) {
      return; // Stop submission if form is invalid
    }

    let mID = this.memberForm.get(['memberId'])?.value;
    let strname = this.memberForm.get(['name'])?.value;
    let stremail = this.memberForm.get(['email'])?.value;
    let strphone = this.memberForm.get(['phone'])?.value;
    let straddress = this.memberForm.get(['address'])?.value;
    let strpassword = this.memberForm.get(['password'])?.value;
    let strlogindate = this.memberForm.get(['loginDate'])?.value;
    let strreneweddate = this.memberForm.get(['lastRenewedDate'])?.value;
    let strmembershipstatus = this.memberForm.get(['membershipStatus'])?.value;

    let memObj = new member(strname, stremail, strphone, straddress, strpassword, strlogindate, strreneweddate, strmembershipstatus);


    memObj.memberId = mID;
    memObj.membershipStatus = strmembershipstatus;

    if (this.isRegisterOnly) {
      this.restService.registerMember(memObj).subscribe({
        next: (data: any) => {
          this.memberForm.patchValue({ memberId: data.memberId });
          this.cdr.detectChanges();
          alert("Member registered with ID: " + data.memberId);

          // Redirect to login page after successful registration
          this.router.navigate(['']);
        },
        error: (err: any) => {
          if (err.status === 409) {
            alert("Email already exists. Please use a different email.");
          } else {
            console.log("Error is :", JSON.stringify(err));
            alert("Registration failed. Please try again.");
          }
        },
        complete: () => console.log("Registration completed.")
      });
    }
    else if (this.strDisplayHeaderTagForAddOrEdit === "ADD MEMBER") {
      this.restService.addMemberRecord(memObj).subscribe({
        next: (data: any) => {
          this.memberForm.patchValue({ memberId: data.memberId });
          this.cdr.detectChanges();
          alert("Member added with ID: " + data.memberId);
          this.displayAddMemberForm = false;
          this.getAllStudents();
          window.location.href = '/user_crud';
          // this.router.navigate(['/user_crud']);
        },
        error: (err: any) => console.log("Error is :" + JSON.stringify(err)),
        complete: () => console.log("Adding a record is completed.")
      });
    } else if (this.strDisplayHeaderTagForAddOrEdit === "EDIT RECORD") {
      this.restService.editMemberRecord(memObj).subscribe({
        next: (data: any) => {
          alert(data);
          console.log(data);
          this.displayAddMemberForm = false;
          this.getAllStudents();
          // this.router.navigate(['/user_crud']);
          window.location.href = '/user_crud';
        },
        error: (err: any) => console.log("Error is :" + JSON.stringify(err)), // JSON.stringify(err) converts the error object into a readable string format.
        complete: () => console.log("Editing a record is completed..")
      });
    }
  }


  // User clicked on edit button.
  editRecord(memberObj: member) {

    this.strDisplayHeaderTagForAddOrEdit = "EDIT RECORD"
    this.bDisplayAddOrEditRecord = true
    this.displayAddMemberForm = true

    this.memberForm.patchValue({
      memberId: memberObj.memberId,
      name: memberObj.name,
      email: memberObj.email,
      phone: memberObj.phone,
      address: memberObj.address,
      password: memberObj.password,
      loginDate: memberObj.loginDate,
      lastRenewedDate: memberObj.lastRenewedDate,
      membershipStatus: memberObj.membershipStatus
    })
  }

  deleteRecord(memId: number) {
    this.restService.deleteMemberRecord(memId).subscribe({
      next: (data) => { alert(data); this.getAllStudents(); },
      error: (err) => console.log('Error is: ' + JSON.stringify(err)),
      complete: () => console.log("Delete operation is complete..")
    })
  }
}