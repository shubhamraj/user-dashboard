import { Component, ElementRef, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserListAddModalComponent } from './user-list-add-modal/user-list-add-modal.component';
import { UserListViewModalComponent } from './user-list-view-modal/user-list-view-modal.component';
import { UserDetailsService } from '../_services/user-details.service';
import { UserAuthService } from '../_services/user-auth.service';
import { Router } from '@angular/router';

declare var $: any;

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  userDetails:any=[];
  userDetailsForm: FormGroup;
  loading = false;
  submitted = false;
  userDetailsList:any=[];

  constructor( private elementRef: ElementRef, private router: Router, private userService: UserDetailsService, private userAuth: UserAuthService, private modalService: NgbModal,) { }

  ngOnInit(): void {
    this.getUserList();
  }


  //get saved user data 
  getUserList(){
    this.submitted = true;
    this.loading = true;
    this.userDetailsList = this.userService.getUserList();
  }

  //edit user
  onEditUser(data){
    this.openAddModal(data);
  }

  //remove user from users list
  onRemoveUser(record){
    
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#4CAF50',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
        this.userService.removeUser(record.id);
        this.getUserList();
      }
    })
    
  }

  //open add modal for add users
  openAddModal(record) {

    const modalRef = this.modalService.open(UserListAddModalComponent,
    {
      scrollable: true,
      windowClass: '',
      keyboard: false,
      backdrop: 'static',
    });
    modalRef.componentInstance.fromParent = record;
    modalRef.result.then((result) => {
        this.getUserList();
    }, (reason) => {
      Swal.fire("User Not Found!", "Please Enter valid Details", "warning");
    });
  
  }

  //open display user details modal 
  openDisplayModal(id) {

    const modalRef = this.modalService.open(UserListViewModalComponent,
    {
      scrollable: true,
      windowClass: 'myCustomModalClass',
      keyboard: false,
      backdrop: 'static',
      size:'lg',
    });

    modalRef.componentInstance.fromParent = id;  
    modalRef.result.then((result) => {
        this.getUserList();
    }, (reason) => {
      Swal.fire("User Not Found!", "Please Enter valid Details", "warning");
    });
  
  }

  //logout the user
  Logout(){

    Swal.fire({
      title: 'Are you sure?',
      text: "You want logout!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#4CAF50',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, logout it!'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Logout!',
          'logout successfully',
          'success'
        )
        this.userAuth.logout();
        this.router.navigate(['/login']);
        this.userDetailsList =[];
      }
    })

  }

  //assign background color to body
  ngAfterViewInit(){
    this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = 'lightgrey';
  }

  //reset background color to body
  ngOnDestroy(){
    this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = 'white';
  }

}
