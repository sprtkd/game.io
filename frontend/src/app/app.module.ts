import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BackAnimComponent } from './common/back-anim/back-anim.component';
import { TopBarComponent } from './common/top-bar/top-bar.component';
import { MainBarComponent } from './common/main-bar/main-bar.component';
import { MenuItemComponent } from './common/menu-item/menu-item.component';
import { ActionBarComponent } from './common/action-bar/action-bar.component';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { SystemComponent } from './system/system.component';
import { GameviewComponent } from './gameview/gameview.component';

@NgModule({
  declarations: [
    AppComponent,
    BackAnimComponent,
    TopBarComponent,
    MainBarComponent,
    MenuItemComponent,
    ActionBarComponent,
    HomeComponent,
    SystemComponent,
    GameviewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
