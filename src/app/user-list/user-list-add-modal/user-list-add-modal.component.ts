import { Component, Input, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UserDetailsService } from 'src/app/_services/user-details.service';

@Component({
  selector: 'app-user-list-add-modal',
  templateUrl: './user-list-add-modal.component.html',
  styleUrls: ['./user-list-add-modal.component.css']
})
export class UserListAddModalComponent implements OnInit {

  userDetails:any=[];
  userDetailsForm: FormGroup;
  loading = false;
  submitted = false;
  userDetailsList:any=[];
  @Input() fromParent;
  modalStatus:any=false;

  constructor( private formBuilder: FormBuilder,private userService: UserDetailsService, public activeModal: NgbActiveModal) { }

  ngOnInit(): void {

     //user details reactive forms
     this.userDetailsForm = this.formBuilder.group({
       id: [''],
      name: ['', Validators.required],
      email: ['', [Validators.required,Validators.email]],
      mobile:['', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
      dob: ['', Validators.required],
      address: ['', Validators.required]
    }); 

    if(this.fromParent == null){
      this.modalStatus = true;
    }else{
      this.userDetailsForm.setValue(this.fromParent);
    }
 
   
  }

  //getter for  access to form fields
  get f() { return this.userDetailsForm.controls; }

  //Add User Data 
  onSaveUserList() {

    this.submitted = true;

     // close here if form is invalid
    if (this.userDetailsForm.invalid) {
      return;
    }
  

    if(this.modalStatus){
      this.loading = true;
      this.userService.saveUserDetails(this.userDetailsForm.value);
      Swal.fire("Success", "Record Added Successfully", "success");
      this.loading = false;
    }else{
      this.loading = true;
      this.userService.updateUserDetails(this.userDetailsForm.value);
      Swal.fire("Success", "Record Updated Successfully", "success");
      this.loading = false;
    }


    this.userDetailsForm.reset();
    this.activeModal.close();

  }

  //close modal popup 
  closeModal() {
    this.activeModal.close();
  }

}
