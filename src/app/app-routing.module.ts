import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserListComponent } from './user-list/user-list.component';
import { UserLoginComponent } from './user-login/user-login.component';
import { UserRegisterComponent } from './user-register/user-register.component';
import { AuthGuard } from './_helpers/auth.guard';

const routes: Routes = [
  { path: '', component: UserLoginComponent, canActivate: [AuthGuard] },
  { path: 'login', component: UserLoginComponent },
  { path: 'register', component: UserRegisterComponent },
  { path: 'userList', component: UserListComponent,canActivate: [AuthGuard]},
  { path: '**', component:UserLoginComponent  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
