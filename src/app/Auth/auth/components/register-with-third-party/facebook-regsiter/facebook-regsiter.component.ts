import { AfterViewInit, Component, Inject, inject, OnInit, Renderer2 } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ThirdPartyModel } from '../../../Models/third-party.model';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-facebook-regsiter',
  templateUrl: './facebook-regsiter.component.html',
  styleUrl: './facebook-regsiter.component.scss'
})
export class FacebookRegsiterComponent implements OnInit ,AfterViewInit {
  facebookRegisterForm!:FormGroup;
  facebookToken:string="";
  userId:string="";
  provider:string="";

  constructor(
    private authService:AuthService,
    private fb:FormBuilder,
    private router:Router,
    private activatedRoute:ActivatedRoute,
    private _renderer:Renderer2,
    @Inject(DOCUMENT) private _document:Document
  ){}
  ngAfterViewInit(): void {
    const script1 = this._renderer.createElement("script");
    script1.src = "https://accounts.google.com/gsi/client";
    this._renderer.setAttribute(script1, "async", "true");
    this._renderer.setAttribute(script1, "defer", "true");
    this._renderer.appendChild(this._document.body, script1);
  }
  ngOnInit(): void {
   this.facebookRegisterForm=this.fb.group({
    firstName:this.fb.control('',[Validators.required,Validators.maxLength(15),Validators.minLength(6)]),
    lastName:this.fb.control('',[Validators.required,Validators.maxLength(15),Validators.minLength(6)]),
   })
   this.facebookToken=this.activatedRoute.snapshot.queryParamMap.get("access_token") as string
   this.userId=this.activatedRoute.snapshot.queryParamMap.get("userId") as string

    this.provider=this.activatedRoute.snapshot.paramMap.get("provider") as string;
  }

  get firstName(){
    return this.facebookRegisterForm.get('firstName');
  }
  get lastName(){
    return this.facebookRegisterForm.get('lastName');
  }

Submit(){
debugger
  var thirdParty:ThirdPartyModel={
    accessToken:this.facebookToken,
    firstName:this.firstName?.value,
    lastName:this.lastName?.value,
    userId:this.userId,
    provider:this.provider
  }
  this.authService.thirdPartyRegister(thirdParty).subscribe(result=>{
    this.router.navigate(['/auth/confirmAlert'])
   });

}

}
