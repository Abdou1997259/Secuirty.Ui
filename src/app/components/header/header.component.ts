import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../Auth/auth/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
isLogged:boolean=false
constructor(private authSerice:AuthService){

}
  ngOnInit(): void {
    this.authSerice.isLoggedIn().subscribe(x=>this.isLogged=x);
  }
  logout(){
    this.authSerice.logout();
  }
}
