import { NgModule } from "@angular/core";

import { Router, RouterModule, Routes } from "@angular/router";
import { LoginComponent } from "./components/login/login.component";
import { RegisterComponent } from "./components/register/register.component";
import { ConfirmComponent } from "./components/confirm/confirm.component";
import { ConfirmedComponent } from "./components/confirmed/confirmed.component";
import { ProductComponent } from "./components/product/product.component";
import { isAuthenticatedGuard } from "./guards/is-authenticated.guard";
import { ForgetPasswordComponent } from "./components/forget-password/forget-password.component";
import { ResetPasswordComponent } from "./components/reset-password/reset-password.component";
import { FacebookRegsiterComponent } from "./components/register-with-third-party/facebook-regsiter/facebook-regsiter.component";

const routes:Routes=[
    {path:"",redirectTo:'login',pathMatch:'full'},
    {path:'login',component:LoginComponent},
    {path:'register',component:RegisterComponent},
    {path:'confirmAlert',component:ConfirmComponent},
    {path:'confirm',component:ConfirmedComponent},
    {path:'forget-password',component:ForgetPasswordComponent},
    {path:'reset-password',component:ResetPasswordComponent},
    {path:"register/third-party/:provider",component:FacebookRegsiterComponent},
    {path:'product',component:ProductComponent,canActivate:[isAuthenticatedGuard]}
]
@NgModule(
{
    imports:[RouterModule.forChild(routes)],
    exports:[RouterModule]
}

)
export class AuthRoutingMoudle{

}
