import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-validation-messages',
  templateUrl: './validation-messages.component.html',
  styleUrl: './validation-messages.component.scss'
})
export class ValidationMessagesComponent implements OnInit {
@Input()errorMessages:string[]|undefined;
constructor(){

}
  ngOnInit(): void {
  console.log(this.errorMessages)
  }
}
