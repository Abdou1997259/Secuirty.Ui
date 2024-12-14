import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ThirdPartyModel } from '../../../Models/third-party.model';

@Component({
  selector: 'app-facebook-regsiter',
  templateUrl: './facebook-regsiter.component.html',
  styleUrl: './facebook-regsiter.component.scss'
})
export class FacebookRegsiterComponent implements OnInit {
  facebookRegisterForm!:FormGroup;
  facebookToken:string="";
  userId:string="";

  constructor(
    private authService:AuthService,
    private fb:FormBuilder,
    private router:Router,
    private activatedRoute:ActivatedRoute
  ){}
  ngOnInit(): void {
   this.facebookRegisterForm=this.fb.group({
    firstName:this.fb.control('',[Validators.required,Validators.maxLength(15),Validators.minLength(6)]),
    lastName:this.fb.control('',[Validators.required,Validators.maxLength(15),Validators.minLength(6)]),
   })
   this.facebookToken=this.activatedRoute.snapshot.queryParamMap.get("access_token") as string
   this.userId=this.activatedRoute.snapshot.queryParamMap.get("userId") as string


  }

  get firstName(){
    return this.facebookRegisterForm.get('firstName');
  }
  get lastName(){
    return this.facebookRegisterForm.get('lastName');
  }

Submit(){

  var thirdParty:ThirdPartyModel={
    accessToken:this.facebookToken,
    firstName:this.firstName?.value,
    lastName:this.lastName?.value,
    userId:this.userId,
    provider:'facebook'
  }
  this.authService.thirdPartyRegister(thirdParty).subscribe(result=>{
    this.router.navigate(['/auth/confirmAlert'])
   });

}

}
