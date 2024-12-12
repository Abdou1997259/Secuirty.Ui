import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { MatchPasswordValidator } from '../../../../shared/shared/CustomValidators/confirm-password.validator';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit {
registerForm!:FormGroup


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
   
}



