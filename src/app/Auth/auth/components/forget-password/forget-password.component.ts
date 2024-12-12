import { afterNextRender, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  standalone:false,
  styleUrl: './forget-password.component.scss',
 
})
export class ForgetPasswordComponent {
emailAccount:string=""
constructor(private authservice:AuthService){}

onSubmit(){
  debugger
  const email=this.emailAccount
  this.authservice.FortGetPassword(email ).subscribe({
    next:()=>{

    },
    error:()=>{

    }
    
  });
}
}
