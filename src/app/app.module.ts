import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceService } from './service/service.service';
import { HttpClientModule} from '@angular/common/http';
import { AceptadoComponent } from './Pages/aceptado/aceptado.component';
import { RechazadoComponent } from './Pages/rechazado/rechazado.component';
import { HomeComponent } from './Pages/home/home.component';
import { UploadComponent } from './Pages/upload/upload.component';
import { LoginComponent } from './Pages/login/login.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from '../environments/environment';


@NgModule({
  declarations: [
    AppComponent,
    AceptadoComponent,
    RechazadoComponent,
    HomeComponent,
    UploadComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,    
    AngularFireAuthModule
  ],
  providers: [ ServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
