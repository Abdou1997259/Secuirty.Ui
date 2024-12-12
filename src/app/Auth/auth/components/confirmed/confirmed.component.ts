import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Confirm } from '../../Models/confirm.model';

@Component({
  selector: 'app-confirmed',
  templateUrl: './confirmed.component.html',
  styleUrl: './confirmed.component.scss'
})
export class ConfirmedComponent implements OnInit {
  constructor(
    private activateRoute:ActivatedRoute,
    private authService:AuthService

  ){}
  ngOnInit(): void {
  console.log(  this.activateRoute.snapshot.queryParamMap.get('email'))
  console.log(  this.activateRoute.snapshot.queryParamMap.get('token'))
  const confirm:Confirm={
    email:this.activateRoute.snapshot.queryParamMap.get("email")?? "",
    token:this.activateRoute.snapshot.queryParamMap.get('token')?? ""
  }
  this.authService.Confirm( confirm).subscribe(x=>{
    console.log(x)
  })


  }

  
}
