import { AfterViewChecked, AfterViewInit, Component, ElementRef, Inject, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

import { Router } from '@angular/router';
import { CredentialResponse } from 'google-one-tap';
import { jwtDecode } from 'jwt-decode'
import { DOCUMENT } from '@angular/common';
import { ConfirmPasswordValidator } from '../../../../shared/shared/validators/confirm-password.validator';
import { NotificationService } from '../../../../shared/shared/services/notification.service';

declare const FB: any;

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit ,AfterViewInit {
registerForm!:FormGroup
@ViewChild("googleButton", { static: true }) googleButton!: ElementRef;
errorMessages:string[]=[]
constructor(
 private fb:FormBuilder,
 private authService:AuthService,
 private router:Router,
 private rendere2:Renderer2,
 private notificationService: NotificationService, 
 @Inject(DOCUMENT) document:Document
){}
  ngAfterViewInit(): void {
    const script1=this.rendere2.createElement('script');
    script1.src="https://accounts.google.com/gsi/client";
    script1.defer='true';
    script1.asyn='true';

    this.rendere2.appendChild(document.body,script1);
  }
  ngOnInit(): void {
    this.registerForm=this.fb.group({
      email:this.fb.control('',[
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$')


      ]
      ),
      userName:this.fb.control('',[Validators.required]),
      firstName:this.fb.control('',[Validators.required,Validators.maxLength(15),Validators.minLength(6)]),
      lastName:this.fb.control('',[Validators.required,Validators.maxLength(15),Validators.minLength(6)]),
      password:this.fb.control('',[Validators.required,Validators.maxLength(15),Validators.minLength(6)]),
      confirmPassword:this.fb.control('',Validators.required)
    },  { validators: ConfirmPasswordValidator() })
    this.initGoogleButton();
  }


  
   Submit(){
    this.authService.Regsiter(this.registerForm.value).subscribe({
     next:()=>{
      this.notificationService.success('Registration successful!', 'Success');
      this.router.navigate(['/auth/confirmAlert'])
     },
     error:error=>{
      if(error.error.Error)
      {
      
     
       this.errorMessages =error.error.Error;
      }
      if(error.error.message){
        this.errorMessages.push(error.error.message)
      }
     }
    });

  }

  get email(){
    return this.registerForm.get('email');
  }
  get userName(){
    return this.registerForm.get('userName');
  }
  get firstName(){
    return this.registerForm.get('firstName');
  }
  get lastName(){
    return this.registerForm.get('lastName');
  }
  get password(){
    return this.registerForm.get('password');
  }
  get confirmPassword(){
    return this.registerForm.get('confirmPassword');
  }
  registerWithFacebook(){

    FB.login(async (fbResult: any) => {
      debugger
      if (fbResult.authResponse) {
        const accessToken = fbResult.authResponse.accessToken;
        const userId = fbResult.authResponse.userID;
        this.router.navigateByUrl(`auth/register/third-party/facebook?access_token=${accessToken}&userId=${userId}`);
      } else {

      }
    })
  }
  private initGoogleButton(): void {
    if (!(window as any).google) {
      console.error('Google Identity Services library not loaded.');
      return;
    }

    //@ts-ignore
    google.accounts.id.initialize({
      client_id: "306830768862-26v68gc2uh8828hrg2jom187dkq675ro.apps.googleusercontent.com",
      callback: this.googleCallBack.bind(this),
      auto_select: false,
      cancel_on_tap_outside: true,
    });

    //@ts-ignore
    google.accounts.id.renderButton(this.googleButton.nativeElement, {
      size: "medium",
      shape: 'rectangular',
      text: 'signin_with',
      logo_alignment: 'center',
    });
  }


  private async googleCallBack(response:CredentialResponse){
    console.log(response);
    const decodedToken:any=jwtDecode(response.credential);
    this.router.navigateByUrl(`auth/register/third-party/google?access_token=${response.credential}&userId=${decodedToken.sub}`);
  }
}



