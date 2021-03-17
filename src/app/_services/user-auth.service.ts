import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { User } from '../_models/register-user';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {

  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  existingUserData:any=[];
  existingUserDetails:any=[];

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
   }

   public get currentUserValue(): User {
    return this.currentUserSubject.value;
   }

  //Registration of new user
  register(userData: User) {
        
    if(localStorage.getItem('register-users') != undefined && localStorage.getItem('register-users') != null){
        this.existingUserData = JSON.parse(atob(localStorage.getItem('register-users')));   
    } 

    this.existingUserData = this.existingUserData || [];
    userData.id = this.existingUserData.length + 1 ;

    let existingUser = this.existingUserData.find(i => i.emailId === userData.emailId);

    if(existingUser == null || existingUser == undefined ){
      this.existingUserData.push(userData);
      localStorage.setItem('register-users', btoa(JSON.stringify(this.existingUserData)));
      return userData;  
    }else{
      return null;
    }
  }       

  //login user
  login(userData) {
   
      if(localStorage.getItem('register-users') == null || localStorage.getItem('register-users') == undefined){
        return null;
      }else{
      this.existingUserData = JSON.parse(atob(localStorage.getItem('register-users'))); 
      let authUser = this.existingUserData.find(i => i.username === userData.username && i.password === userData.password); 
      localStorage.setItem('currentUser', JSON.stringify(authUser));
      this.currentUserSubject.next(authUser);
      return authUser;
      }
  }

  // remove user from local storage and set current user to null
  logout() {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }
}
