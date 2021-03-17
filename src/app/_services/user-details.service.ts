import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserList } from '../_models/user-list';

@Injectable({
  providedIn: 'root'
})
export class UserDetailsService {

  existingUserData:any=[];
  existingUserDetails:any=[];

  constructor(private http: HttpClient) { }

  //get users list
  getUserList(){

      let cuser = JSON.parse(localStorage.getItem('currentUser'));
      let uId = cuser.id;
     
      if(localStorage.getItem('user-details'+uId) != undefined && localStorage.getItem('user-details'+uId) != null){
          this.existingUserDetails = JSON.parse(atob(localStorage.getItem('user-details'+uId))); 
          return this.existingUserDetails;  
      } else{
        this.existingUserDetails = [];
        return this.existingUserDetails;
      }
      
   
  }

  //get user details
  getUserDetails(userId){

    let cuser = JSON.parse(localStorage.getItem('currentUser'));
    let uId = cuser.id;

    if(localStorage.getItem('user-details'+uId) != undefined && localStorage.getItem('user-details'+uId) != null){
      this.existingUserDetails = JSON.parse(atob(localStorage.getItem('user-details'+uId)));   
      let userDetails = this.existingUserDetails.find(i => i.id === userId); 
      return userDetails;
    } 
    
  }

  //add user details
  saveUserDetails(userData:UserList){

      let cuser = JSON.parse(localStorage.getItem('currentUser'));
      let uId = cuser.id;

      if(localStorage.getItem('user-details'+uId) != undefined && localStorage.getItem('user-details'+uId) != null){
          this.existingUserDetails = JSON.parse(atob(localStorage.getItem('user-details'+uId)));   
      }
      this.existingUserDetails = this.existingUserDetails || [];
      userData.id = this.existingUserDetails.length + 1;
      this.existingUserDetails.push(userData);

      localStorage.setItem('user-details'+uId, btoa(JSON.stringify(this.existingUserDetails)));
  }

  //update user details
  updateUserDetails(userData:UserList){

    let cuser = JSON.parse(localStorage.getItem('currentUser'));
    let uId = cuser.id;

    if(localStorage.getItem('user-details'+uId) != undefined && localStorage.getItem('user-details'+uId) != null){
      this.existingUserDetails = JSON.parse(atob(localStorage.getItem('user-details'+uId)));   
    }
    this.existingUserDetails = this.existingUserDetails || [];
    this.existingUserDetails = this.existingUserDetails.filter(obj => obj.id !== userData.id);
    this.existingUserDetails.push(userData);
    localStorage.setItem('user-details'+uId, btoa(JSON.stringify(this.existingUserDetails)));

  }

  //remove user 
  removeUser(record){

    let cuser = JSON.parse(localStorage.getItem('currentUser'));
    let uId = cuser.id;

    if(localStorage.getItem('user-details'+uId) != undefined && localStorage.getItem('user-details'+uId) != null){
        this.existingUserDetails = JSON.parse(atob(localStorage.getItem('user-details'+uId)));
        this.existingUserDetails = this.existingUserDetails.filter(obj => obj.id !== record);
        localStorage.setItem('user-details'+uId, btoa(JSON.stringify(this.existingUserDetails)));
    }

  }

}
