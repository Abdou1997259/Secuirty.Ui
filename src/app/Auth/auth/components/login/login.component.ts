import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent  implements OnInit{
  loginForm!:FormGroup;
  errorMessage: string = '';
  constructor(
  private  authService:AuthService,
  private  fb:FormBuilder,
  private router:Router
  ){

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
    error:(error)=>{
      
    }
   }
   )
  }
  SendResetConfirmationEmail(){
    
  }
 
}
