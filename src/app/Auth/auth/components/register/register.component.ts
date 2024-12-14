import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { MatchPasswordValidator } from '../../../../shared/shared/CustomValidators/confirm-password.validator';
import { Router } from '@angular/router';
import { CredentialResponse } from 'google-one-tap';
import { jwtDecode } from 'jwt-decode'

declare const FB: any;

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit {
registerForm!:FormGroup
@ViewChild("googleButton", { static: true }) googleButton!: ElementRef;

constructor(
 private fb:FormBuilder,
 private authService:AuthService,
 private router:Router
){}
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
    },  { validators: MatchPasswordValidator('password', 'confirmPassword') })
    this.initGoogleButton();
  }


  Submit(){
     this.authService.Regsiter(this.registerForm.value).subscribe(result=>{
      this.router.navigate(['/auth/confirmAlert'])
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



