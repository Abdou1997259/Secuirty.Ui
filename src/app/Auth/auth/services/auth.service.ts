import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';

import { Observable } from 'rxjs';
import { AutModel } from '../Models/auth.model';
import { RegisterModel } from '../Models/register.model';
import{BaseResponse} from '../../../models/reponse.model'

@Injectable({
  providedIn: 'root'
})
export class AuthService {
 apiURL:string=environment.apiUrl
  constructor(private _http:HttpClient) { }

Regsiter(model:RegisterModel):Observable<BaseResponse<AutModel>>{
  return this._http.post<BaseResponse<AutModel>>(`${this.apiURL}Auth/Register`,model);
}
}
