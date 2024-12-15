import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private toastr:ToastrService) { }
  success(message:string,title?:string){
    this.toastr.success(message,message||'success')
  }
  error(message: string, title?: string): void {
    this.toastr.error(message, title || 'Error');
  }

  info(message: string, title?: string): void {
    this.toastr.info(message, title || 'Info');
  }

  warning(message: string, title?: string): void {
    this.toastr.warning(message, title || 'Warning');
}
}
