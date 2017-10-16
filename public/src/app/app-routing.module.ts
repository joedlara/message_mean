import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WallComponent } from './wall/wall.component';
import { LoginComponent } from './login/login.component';
import { ShowComponent } from './show/show.component';

const routes: Routes = [
	
	{ path: 'login', component: LoginComponent},
	{ path: 'wall', component: WallComponent},
	{ path: 'show/:messageId', component: ShowComponent},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }