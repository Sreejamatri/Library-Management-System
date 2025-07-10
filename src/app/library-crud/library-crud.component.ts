import { ChangeDetectorRef, Component } from '@angular/core';
import { LibrarycrudRestService } from '../librarycrud-rest.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { libraries } from '../libraries';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-library-crud',
  standalone: false,
  templateUrl: './library-crud.component.html',
  styleUrl: './library-crud.component.css'
})
export class LibraryCrudComponent {
  title = 'libraryManagement';
 
  librariesForm!:FormGroup
  constructor(
  private fb : FormBuilder,
  private restService : LibrarycrudRestService,
  private cdr: ChangeDetectorRef,
  private route: ActivatedRoute,
  private router: Router
 
){
  this.librariesForm = this.fb.group({
    locationcode: ['', Validators.required],
    locationname: ['', Validators.required],
    address: ['', Validators.required],
    maxcapacitybooks: ['', [Validators.required, Validators.min(1)]],
    librarianname: ['', Validators.required]
  });
 
 
 }
 
 
  bshowDisplayRecords = false
 
  librariesLst: any;
 
  goBack() {
    if (this.bDisplayAddOrEditRecord) {
      // You're in the form view → go back to main screen
      this.bDisplayAddOrEditRecord = false;
      this.bshowDisplayRecords = true;
    } else {
      // You're in the main screen → go to admin dashboard
       this.router.navigate(['/admin_dashboard']);
    }
  }
 
 
 
  getAllLibraries() {
    this.bshowDisplayRecords = true
    this.bDisplayAddOrEditRecord = false
    this.restService.getAllLibraries().subscribe({
      next: (data) => { this.librariesLst = data; },
      error: (err) => console.log('Libraries error: ' + err),
      complete: () => console.log("Get is completed")
    });
 
  }
 
  addLibraryRecord() {
    this.bDisplayAddOrEditRecord = true;
    this.bshowDisplayRecords = false
 
    this.strDisplayHeaderTagForAddOrEdit = "Add Record"
 
    this.librariesForm.patchValue({
      locationcode: '',
      locationname: '',
      address: '',
      maxcapacitybooks: '',
      librarianname: '',
 
    })
 
  }
  bDisplayAddOrEditRecord = false;
 
  AddingOrEditingARecord() {
    alert("Submit button clicked");
 
    let nlocationcode = this.librariesForm.get(['locationcode'])?.value;
    let strlocationname = this.librariesForm.get(['locationname'])?.value;
    let straddress = this.librariesForm.get(['address'])?.value;
    let nmaxcapacitybooks = this.librariesForm.get(['maxcapacitybooks'])?.value;
    let strlibrarianname = this.librariesForm.get(['librarianname'])?.value;
 
    let libObj = new libraries(nlocationcode, strlocationname, straddress, nmaxcapacitybooks, strlibrarianname)
 
    if (this.strDisplayHeaderTagForAddOrEdit == "Add Record") {
      this.restService.addLibraryRecord(libObj).subscribe({
        next: (data) => { console.log(data); this.getAllLibraries(); },
        error: (err) => console.log("Error is:" + JSON.stringify(err)),
        complete: () => console.log("Adding a record is completed..")
      })
    }
    else if (this.strDisplayHeaderTagForAddOrEdit == "Edit Record") {
      this.restService.EditLibraryRecord(libObj).subscribe({
        next: (data) => { console.log(data); this.getAllLibraries(); },
        error: (err) => console.log("Error is:" + JSON.stringify(err)),
        complete: () => console.log("Editing a record is completed..")
      })
    }
  }
  strDisplayHeaderTagForAddOrEdit = " ";
 
 
 
 
 
 
  editRecord(libraryObj: libraries) {
    this.bshowDisplayRecords = false
    this.strDisplayHeaderTagForAddOrEdit = "Edit Record";
    this.bDisplayAddOrEditRecord = true;
    this.librariesForm.patchValue({
      locationcode: libraryObj.locationcode,
      locationname: libraryObj.locationname,
      address: libraryObj.address,
      maxcapacitybooks: libraryObj.maxcapacitybooks,
      librarianname: libraryObj.librarianname
    })
  }
 
 
 
  deleteRecord(locationcode: number) {
    this.restService.deleteLibraryRecord(locationcode).subscribe({
      next: (data) => { alert(data); this.getAllLibraries(); },
      error: (err) => console.log('error is : ' + JSON.stringify(err)),
      complete: () => console.log("delete operation is complete ")
    })
 
  }
 
 
}
