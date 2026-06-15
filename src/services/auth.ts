import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Iauthentication } from '../authen';
import { BehaviorSubject, catchError, Observable, pipe, tap, throwError } from 'rxjs';
import { User } from '../user.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  private http=inject(HttpClient);
  private router=inject(Router)
user$=new BehaviorSubject<User|null>(null)
expiredtoken:any
  signUp(email: string, password: string): Observable<Iauthentication> {
    return this.http
      .post<Iauthentication>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyB6xMceEPzN-BwQi0wYEHwI7nVVuWDrwIY',
        {
          email: email,
          password: password,
          returnSecureToken: true,
        }
      )
      .pipe(
        catchError((errorData) => this.handelerror(errorData)),
        tap((resData) =>
          this.handelAuthentication(
            resData.email,
            resData.localId,
            resData.idToken,
            +resData.expiresIn
          )
        )
      );
  }
 login(email:string,password:string){
    return this.http.post<Iauthentication>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyB6xMceEPzN-BwQi0wYEHwI7nVVuWDrwIY',{
      email:email,
      password:password,
      returnSecureToken:true
    }).pipe(catchError(this.handelerror),tap((resData)=>this.handelAuthentication(
      resData.email,resData.localId,resData.idToken,+resData.expiresIn

    )))

    }
   Logout(){
this.user$.next(null)
localStorage.removeItem('userData')
if(this.expiredtoken){
clearTimeout(this.expiredtoken)
}
this.router.navigate(['/Register'])
   }
private handelerror(errorData: HttpErrorResponse) {
  let errorMessage = '*An error occurred';
  if (!errorData.error || !errorData.error.error) {
    return throwError(() => new Error(errorMessage));
  }
  switch (errorData.error.error.message) {
    case 'EMAIL_EXISTS':
      errorMessage = 'this email already exists';
      break;
      case 'EMAIL_NOT_FOUND':
        errorMessage='this email not found'
        break;
        case 'INVALID_PASSWORD':
        errorMessage='Wrong password. Try again '
        break;

  }
  return throwError(()=>new Error(errorMessage))
}
private handelAuthentication(email:string,userId:string,token:string,expiresIn:number){
const expiratinDate=new Date (new Date().getTime() + expiresIn*1000)
  const user= new User(
email,userId,token, expiratinDate
)
localStorage.setItem('userData',JSON.stringify(user))
return this.user$.next(user)
this.autoLogout(expiresIn*1000)
}
autologin(){
const storedData = localStorage.getItem('userData');
if (!storedData) {
  return;
}
const userData:{
  email:string,
id:string,
_token:string,
_tokenExpireDate:string
}=JSON.parse(storedData)
if(!userData){
  return;
}
const loadedUser = new User(userData.email,userData.id,userData._token,new Date(userData._tokenExpireDate))
if(loadedUser.token){
return this.user$.next(loadedUser)
}
const Expiredtime=new Date(userData._tokenExpireDate).getTime()-new Date().getTime()
this.autoLogout(Expiredtime)

}
autoLogout(expiratintime:number){
this.expiredtoken=setTimeout(()=>{
  this.Logout()
},
expiratintime
)
}

}
