import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './components/login/login.component';
import { AuthRoutingMoudle } from './auth-routing.module';
import { RegisterComponent } from './components/register/register.component';
import { SharedModule } from '../../shared/shared/shared.module';
import { ConfirmComponent } from './components/confirm/confirm.component';
import { ConfirmedComponent } from './components/confirmed/confirmed.component';
import { ProductComponent } from './components/product/product.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { ForgetPasswordComponent } from './components/forget-password/forget-password.component';



@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    ConfirmComponent,
    ConfirmedComponent,
    ProductComponent,
    ResetPasswordComponent,
    ForgetPasswordComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    AuthRoutingMoudle
  ]
})
export class AuthModule { }
