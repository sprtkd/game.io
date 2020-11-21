import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';
import { GameItemType, GameMenuItem } from '../models/ui/game-item';

@Component({
  selector: 'app-system',
  templateUrl: './system.component.html',
  styleUrls: ['./system.component.scss']
})
export class SystemComponent implements OnInit {
  currentMenu: GameMenuItem;
  constructor(public appComponent: AppComponent) { }

  ngOnInit(): void {
/*     this.getCurrentSystemFromLocalStorage();
    this.addBasicMenuItems();
    this.resolveGamesList(); */
  }
/*   addBasicMenuItems() {
    this.currentMenu.nextItems = [
      {
        name: "Back To Systems",
        url: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQu0Mo1q16-tlH3JqsbEwub5vcorpzy7a2WtQ&usqp=CAU",
        type: GameItemType.SYSTEM,
        active: false,
        isHashBorder: false,
        next: "/",
        nextItems: undefined,
        prev: "/"
      }];
  }

  getCurrentSystemFromLocalStorage() {
    let currSys = getItemFromLocalStorage(GameItemType.SUBMENU);
    if (currSys) {
      this.currentMenu = currSys;
    } else {
      this.appComponent.notify("No System selected!", new Error("No System selected"));
    }
  }

  resolveGamesList() {
    this.appComponent.spinnerStart("Resolving Cache");
    let gameslistCache = this.currentMenu.cache.gameListCache;
    if (!(gameslistCache instanceof Array)) {
      gameslistCache = [gameslistCache];
    }
    let syscount = 0;
    for (let game of gameslistCache) {
      try {
        //this.currentMenu.nextItems.push(convertGameToViewable(convertGameData(game)));
        syscount += 1;
        this.currentMenu.countDetail = syscount + " Games";
      } catch (error) {
        this.appComponent.notify("Failed to resolve cache", error);
      }
    }
    this.appComponent.spinnerStop("Games Cache resolved");
  } */

}
