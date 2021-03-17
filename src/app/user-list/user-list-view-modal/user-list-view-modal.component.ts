import { Component, OnInit, Input  } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UserList } from 'src/app/_models/user-list';
import { UserDetailsService } from 'src/app/_services/user-details.service';
@Component({
  selector: 'app-user-list-view-modal',
  templateUrl: './user-list-view-modal.component.html',
  styleUrls: ['./user-list-view-modal.component.css']
})
export class UserListViewModalComponent implements OnInit {

  @Input() fromParent;
  UserId:any;
  myGroup:any;
  userList: UserList = {} as UserList;


  constructor( private userService: UserDetailsService, public activeModal: NgbActiveModal) { }

  ngOnInit(): void {

    this.myGroup = new FormGroup({
      name: new FormControl(''),
      email: new FormControl(''),
      mobile: new FormControl(''),
      dob: new FormControl(''),
      address: new FormControl(''),
    });

    this.getUserData();
  }

  //Get User Details By User ID
  getUserData(){
    this.UserId = this.fromParent;
    let response = this.userService.getUserDetails(this.UserId);
    this.userList = response;
  }

  //Close Modal Popup
  closeModal() {
    this.activeModal.close();
  }

}
