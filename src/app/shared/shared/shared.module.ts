import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ValidationMessagesComponent } from './errors/validation-messages/validation-messages.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';



@NgModule({
  declarations: [ValidationMessagesComponent],
  imports: [
    CommonModule  
  ]
  ,
  exports:[ValidationMessagesComponent,FormsModule,ReactiveFormsModule],

})
export class SharedModule { }
