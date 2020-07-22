import { LoginGuard } from './Guard/login.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AceptadoComponent } from './Pages/aceptado/aceptado.component';
import { RechazadoComponent } from './Pages/rechazado/rechazado.component';
import {HomeComponent} from './Pages/home/home.component';
import {UploadComponent} from './Pages/upload/upload.component';
import {LoginComponent} from './Pages/login/login.component';

const routes: Routes = [
{ path: '', pathMatch: 'full', redirectTo: 'login' },
{path: 'home', component: HomeComponent, canActivate: [LoginGuard]},
{path: 'aceptado/:status', component: AceptadoComponent },
{path: 'rechazado/:status', component: RechazadoComponent},
{path: 'upload/:name', component: UploadComponent, canActivate: [LoginGuard]},
{path: 'login', component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
