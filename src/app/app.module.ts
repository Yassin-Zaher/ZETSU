import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserModule } from './user/user.module';
import { NavComponent } from './nav/nav.component';
import { TabsContainerComponent } from './chared/tabs-container/tabs-container.component';
import { TabComponent } from './chared/tab/tab.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    TabsContainerComponent,
    TabComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    UserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
