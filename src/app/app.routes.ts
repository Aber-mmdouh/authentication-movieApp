import { Routes } from '@angular/router';
import { Register } from '../register/register';
import { Movie } from '../movie/movie';
import { authguardGuard } from '../guards/authguard-guard';

export const routes: Routes = [
    {path:'',component:Register},
  {path:'Register',component:Register},
  {path:'movie',component:Movie,canActivate:[authguardGuard]}
];
