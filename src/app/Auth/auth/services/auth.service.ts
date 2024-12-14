import { ThirdPartyModel } from './../Models/third-party.model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';

import { BehaviorSubject, catchError, Observable, Subject, tap, throwError } from 'rxjs';
import { AuthModel } from '../Models/auth.model';
import { RegisterModel } from '../Models/register.model';
import{BaseResponse} from '../../../models/reponse.model'
import { Confirm } from '../Models/confirm.model';
import { LoginModel } from '../Models/login.model';
import { RefreshTokenModel } from '../Models/refresh.token.model';
import { ResetPasswordModel } from '../Models/reset-password.mode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private tokenKey: string = 'AccessToken';
  private refreshTokenKey: string = 'RefreshToken';
  private isLoggedInSubject = new BehaviorSubject<boolean>(this.hasToken());

   apiURL:string=environment.apiUrl
  constructor(private _http:HttpClient) { }
FortGetPassword(email:string):Observable<BaseResponse<string>>{
 return this._http.get<BaseResponse<string>>(`${this.apiURL}Auth/ForgetPassword`, {
  params:new HttpParams().set('email',email)
 }).pipe(catchError(this.handleError));
}

Regsiter(model:RegisterModel):Observable<BaseResponse<AuthModel>>{
  return this._http.post<BaseResponse<AuthModel>>(`${this.apiURL}Auth/Register`,model).pipe(catchError(this.handleError));
}
Confirm(model:Confirm):Observable<BaseResponse<string>>{
   return this._http.post<BaseResponse<string>>(`${this.apiURL}Auth/ConfirmEmail`,model).pipe(catchError(this.handleError));
}
login(login:LoginModel):Observable<BaseResponse<AuthModel>>{
 return this._http.post<BaseResponse<AuthModel>>(`${this.apiURL}Auth/Login`,login).pipe(tap(response=>{
   if(response&&response.data){
    this.setTokens(response.data.accessToken,response.data.refreshToken)
   }
 }),catchError(this.handleError));
}
thirdPartyRegister(thirdParty:ThirdPartyModel):Observable<BaseResponse<AuthModel>>{
  return this._http.post<BaseResponse<AuthModel>>(`${this.apiURL}Auth/ThirdPartyRegister`,thirdParty)
  .pipe(tap(response=>{
    if(response&&response.data){
      this.setTokens(response.data.accessToken,response.data.refreshToken)
    }
  }),catchError(this.handleError))
}
private hasToken(){
  const token=window.localStorage.getItem('AccessToken');
  return !!token;
}
public getAccessToken(): string | null {
  return window.localStorage.getItem(this.tokenKey);
}
refreshToken(){
  const refreshToken = this.getRefreshToken();
  if (!refreshToken) {
    throw new Error('No refresh token found.');


  }
  const accessToken=this.getAccessToken();
  if (!accessToken) {
    throw new Error('No accessToken  found.');


  }
  const refreshModel:RefreshTokenModel={
    accessToken:accessToken,
    RefreshToken:refreshToken
  };
  return this._http.post<BaseResponse<AuthModel>>(`${this.apiURL}Auth/RefreshToken`,refreshModel).pipe(
    tap(response=>{
      if(response&&response.data){
        this.setTokens(response.data.accessToken, response.data.refreshToken);
      }
    }),
    catchError(this.handleError)
  )
}
// Get refresh token from localStorage
public getRefreshToken(): string | null {
  return window.localStorage.getItem(this.refreshTokenKey);
}

// Set tokens in localStorage
private setTokens(accessToken: string, refreshToken: string): void {
  window.localStorage.setItem(this.tokenKey, accessToken);
  window.localStorage.setItem(this.refreshTokenKey, refreshToken);
  this.isLoggedInSubject.next(true);
}
logout(): void {
  window.localStorage.removeItem(this.tokenKey);
  window.localStorage.removeItem(this.refreshTokenKey);
  this.isLoggedInSubject.next(false);
}
isLoggedIn(): Observable<boolean> {
  return this.isLoggedInSubject.asObservable();
}
ResetPassword(resetPasswordModel:ResetPasswordModel ):Observable<BaseResponse<string>>{
  return this._http.post<BaseResponse<string>>(`${this.apiURL}Auth/ResetPassword`,resetPasswordModel).pipe(catchError(this.handleError))
}
private handleError(error:BaseResponse<any>){
  console.error(error);
  return throwError(()=>new Error(error.error ||'Something went wrong. Please try again later.'))
}
}
