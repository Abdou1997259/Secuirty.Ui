import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

import { ResetPasswordModel } from '../../Models/reset-password.mode';
import { ConfirmPasswordValidator } from '../../../../shared/shared/validators/confirm-password.validator';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.scss'
})
export class ResetPasswordComponent implements OnInit {
  confirmPasswordForm!:FormGroup
  token:string='';
email:string="";
constructor(
  private fb:FormBuilder,
  private authService:AuthService,
  private router:Router,
  private activateRoute:ActivatedRoute
){}
  ngOnInit(): void {
   this.token=  this.activateRoute.snapshot.queryParamMap.get('token') as string;
   this.email=  this.activateRoute.snapshot.queryParamMap.get('email') as string;
    this.confirmPasswordForm=this.fb.group({
     
      password:this.fb.control('',[Validators.required,Validators.maxLength(15),Validators.minLength(6)]),
      confirmPassword:this.fb.control('',Validators.required)
    },  { validators: ConfirmPasswordValidator() })




  }


  get password(){
    return this.confirmPasswordForm.get('password');
  }
  get confirmPassword(){
    return this.confirmPasswordForm.get('confirmPassword');
  }
  Submit(){
   const resetPasswordModel:ResetPasswordModel={
    token:this.token,
    password:this.password?.value,
  email:this.email
   }
   this.authService.ResetPassword(resetPasswordModel).subscribe({next:()=>{
    this.router.navigate(['auth/login'])
   }})
  }
}
