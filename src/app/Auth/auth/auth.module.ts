import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './components/login/login.component';
import { AuthRoutingMoudle } from './auth-routing.module';
import { RegisterComponent } from './components/register/register.component';
import { SharedModule } from '../../shared/shared/shared.module';



@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    AuthRoutingMoudle
  ]
})
export class AuthModule { }
