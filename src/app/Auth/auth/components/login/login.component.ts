import { LoginThirdPary } from './../../Models/login-third-party.model';
import { AfterViewInit, Component, ElementRef, Inject, OnInit, Renderer2, ViewChild } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DOCUMENT } from '@angular/common';
import { jwtDecode } from 'jwt-decode';
import { CredentialResponse } from 'google-one-tap';
declare const FB:any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent  implements OnInit ,AfterViewInit{
  loginForm!:FormGroup;

  @ViewChild("googleButton", { static: true }) googleButton!: ElementRef;
  errorMessages:string[]=[]
  constructor(
  private  authService:AuthService,
  private  fb:FormBuilder,
  private router:Router,
  private render2:Renderer2,
  @Inject(DOCUMENT) document:Document
  ){

  }
  ngAfterViewInit(): void {
    const script1=this.render2.createElement('script');
    script1.src="https://accounts.google.com/gsi/client"
    script1.defer='true';
    script1.asyn='true';
    this.render2.appendChild(document.body,script1);
    
  }
  ngOnInit(): void {
    this.loginForm=this.fb.group({
      email:this.fb.control('',[
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$')


      ]
      ),

      password:this.fb.control('',[Validators.required,Validators.maxLength(15),Validators.minLength(6)]),

    })
    this.initGoogleButton();
  }


  get email(){
    return this.loginForm.get('email');
  }
  get password(){
    return this.loginForm.get('password');
  }
  login(){
   this.authService.login(this.loginForm.value).subscribe({
    next:(data)=>{
     this.router.navigate(['/auth/product']);
    },
    error:error=>{
      debugger
      if(error.error.Error)
      {
      
    
       this.errorMessages =error.error.Error;
      }
      if(error.error.message){
        this.errorMessages.push(error.error.message)
      }
     }
   }
   )
  }
  SendResetConfirmationEmail(){

  }
  loginWithFacebook(){

    FB.login(async (fbResult: any) => {

      const accesstoken=fbResult.authResponse.accessToken;
      const userId=fbResult.authResponse.userID;
      const loginThirdPary:LoginThirdPary={
        accessToken:accesstoken,
        userId:userId,
        provider:'facebook'
      }
      this.authService.loginWithThridPary(loginThirdPary).subscribe({
        next:(rest)=>{
          this.router.navigate(['/auth/product']);

        }
      })
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
      text: 'continue_with',
      logo_alignment: 'center',
    });
  }
  private async googleCallBack(response:CredentialResponse){

    debugger
      console.log(response);
      const decodedToken:any=jwtDecode(response.credential);
      const loginThirdPary:LoginThirdPary={
        accessToken:response.credential,
        userId:decodedToken.sub,
        provider:'google'
      }
     this.authService.loginWithThridPary(loginThirdPary).subscribe({
      next:()=>{
        this.router.navigate(['/auth/product']);
      }
     })
   
  
    }


}
