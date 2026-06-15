import { Component, DestroyRef, effect, inject, OnInit, signal } from '@angular/core';
import { Auth } from '../../services/auth';

@Component({
  selector: 'app-nav',
  imports: [],
  templateUrl: './nav.html',
  styleUrl: './nav.css',
})
export class Nav {

  private auth=inject(Auth)
  authenticate=signal(!! localStorage.getItem('userData'))
  destroy=inject(DestroyRef)
  constructor(){

  }

  onlogout(){
    this.auth.Logout()
  }
}

