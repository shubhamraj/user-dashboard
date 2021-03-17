import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserLoginComponent } from './user-login/user-login.component';
import { UserRegisterComponent } from './user-register/user-register.component';
import { UserListComponent } from './user-list/user-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { UserListAddModalComponent } from './user-list/user-list-add-modal/user-list-add-modal.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { UserListViewModalComponent } from './user-list/user-list-view-modal/user-list-view-modal.component';
import { UserAuthService } from './_services/user-auth.service';
import { UserDetailsService } from './_services/user-details.service';


@NgModule({
  declarations: [
    AppComponent,
    UserLoginComponent,
    UserRegisterComponent,
    UserListComponent,
    UserListAddModalComponent,
    UserListViewModalComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    NgbModule   
  ],
  providers: [UserAuthService, UserDetailsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
