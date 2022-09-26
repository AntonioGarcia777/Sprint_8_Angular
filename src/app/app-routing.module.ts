import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
  /*{
    path: 'characters',
    loadChildren: () => import('./characters/characters.module').then(m => m.CharactersModule),
    data: {
      pageTitle: 'Characters'
    }
  },
  {
    path: 'films',
    loadChildren: () => import('./films/films.module').then(m => m.FilmsModule),
    data: {
      pageTitle: 'Films'
    }
  },*/
  {
    path: 'home',
    component: HomeComponent
  },
  { path: 'register', 
  component: RegisterComponent 
  },
  { 
    path: 'login', 
    component: LoginComponent 
  },
  { path: 'profile', 
  component: ProfileComponent 
  },  
  {
    path: 'starships',
    loadChildren: () => import('./starships/starships.module').then(m => m.StarshipsModule),
    data: {
      pageTitle: 'Starships'
    }
  },  
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home'
  },
  {
    path: '**',
    redirectTo: 'home'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
