import { HttpClient } from '@angular/common/http';
import { Component, signal } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Auth } from '../services/auth';
import { Router, RouterOutlet } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { User } from '../user.model';

@Component({
  selector: 'app-register',
  imports: [FormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  isloading=false
  email=signal('')
  password=signal('')
isLogginMode=true
error=signal(null)
authentication=signal(false)
  injector: any;
  constructor(private _auth:Auth,
    private router:Router
  ){
  }
  switchmode(){
    this.isLogginMode=!this.isLogginMode
  }


onsubmit(form:NgForm){
this.isLogginMode=true

if(this.isLogginMode){
this._auth.login(this.email(),this.password()).subscribe({
next:()=>{
  this.isLogginMode=true

this.router.navigate(['/movie'])
},
error:(errorData)=>{this.error.set(errorData)}
}
)
}else{
this.isloading=false
this._auth.signUp(this.email(),this.password()).subscribe({
  next:(res)=>{console.log(res)
    this.router.navigate(['/movie'])

  },
  error:(errorData)=>{
    this.error=errorData

  }
})
}
form.reset()
}

    }



