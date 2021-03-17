import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MustMatch } from '../_helpers/must-match.validator';
import { first } from 'rxjs/operators';
import { UserAuthService } from '../_services/user-auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css']
})
export class UserRegisterComponent implements OnInit {
  registerForm: FormGroup;
  loading = false;
  submitted = false;
  userRegister:any;
  constructor(private formBuilder: FormBuilder, private userService: UserAuthService,private router: Router) { 
    
  }

  ngOnInit(): void {

    this.registerForm = this.formBuilder.group({
      emailId: ['', [Validators.required, Validators.email]],
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      cpassword: ['', [Validators.required, Validators.minLength(6)]]
    },{
      validator: MustMatch('password', 'cpassword')
    });

  }

  get f() { return this.registerForm.controls; }


  //register data store by service
  onSubmit() {

      this.submitted = true; 
      if (this.registerForm.invalid) {
        return;
      }
      this.loading = true;
      this.userRegister =  this.userService.register(this.registerForm.value);
      this.loading = false;
      if(this.userRegister == null){
        Swal.fire("Warning", "User already exist", "warning");
      }else{
        Swal.fire("Success", "Register Successfully", "success");
        this.router.navigate(['/login']);
      }
  
  }

}
