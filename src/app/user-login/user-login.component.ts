import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'
import { UserAuthService } from '../_services/user-auth.service';


@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {
  UserData:any;
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  constructor(private userService: UserAuthService,  private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
  });
  }
  get f() { return this.loginForm.controls; }

  //pass login data to service
  onSubmit(){
    this.submitted = true;
      
    // stop here if form is invalid
    if (this.loginForm.invalid) {
        return;
    }

    this.UserData =  this.userService.login(this.loginForm.value);

    if(this.UserData != undefined && this.UserData != null){
      this.router.navigate(['/userList']);
    }else{
      Swal.fire("User Not Found!", "Please Enter valid Details or Create new account", "warning");
      this.router.navigate(['/']);
    }

  }

  

}
