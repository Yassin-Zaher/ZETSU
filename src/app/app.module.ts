import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserModule } from './user/user.module';
import { NavComponent } from './nav/nav.component';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { VideoModule } from './video/video.module';
import { ClipComponent } from './clip/clip.component';
import { MatButtonModule } from '@angular/material/button';
import { ClipListComponent } from './clip-list/clip-list.component';
import { TimestampDatePipe } from './pipes/timestamp-date.pipe';
import { MatSnackBarModule } from '@angular/material/snack-bar'





const angularMaterial = [
  MatButtonModule,
  MatSnackBarModule
]

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    AboutComponent,
    ClipComponent,
    ClipListComponent,
    TimestampDatePipe

  ],
  imports: [
    BrowserModule,
    UserModule,
    AngularFireModule.initializeApp(environment.fireabse),
    AngularFireAuthModule,
    BrowserAnimationsModule,
    AngularFirestoreModule,
    VideoModule,
    AngularFireStorageModule,
    ...angularMaterial,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
