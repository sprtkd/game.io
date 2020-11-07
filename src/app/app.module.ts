import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BackAnimComponent } from './common/back-anim/back-anim.component';
import { TopBarComponent } from './common/top-bar/top-bar.component';
import { MainBarComponent } from './common/main-bar/main-bar.component';
import { MenuItemComponent } from './common/menu-item/menu-item.component';
import { ActionBarComponent } from './common/action-bar/action-bar.component';

@NgModule({
  declarations: [
    AppComponent,
    BackAnimComponent,
    TopBarComponent,
    MainBarComponent,
    MenuItemComponent,
    ActionBarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
