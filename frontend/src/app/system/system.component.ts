import { Component, OnInit } from '@angular/core';
import { from, of } from 'rxjs';
import { map, catchError, mergeMap } from 'rxjs/operators';

import { AppComponent } from '../app.component';
import { GameIAGLModel, SystemIAGLModel } from '../models/ui/basic_models';
import { GameItemType, GameMenuItem } from '../models/ui/game-item';
import { FetchIaglService } from '../services/fetch-iagl.service';
import { convertGameToViewable, convertSystemToViewable, getItemFromLocalStorage } from '../utils/render_utils';

@Component({
  selector: 'app-system',
  templateUrl: './system.component.html',
  styleUrls: ['./system.component.scss']
})
export class SystemComponent implements OnInit {
  currentMenu: GameMenuItem;
  constructor(private fetchIaglService: FetchIaglService, public appComponent: AppComponent) { }

  ngOnInit(): void {
    this.getCurrentSystemFromLcSAndJson();
  }
  addBasicMenuItems() {
    this.currentMenu.nextItems = [
      {
        name: "Back To Main Menu",
        countDetail: "0",
        renderUrl: "",
        prevRedirect: "/",
        nextRedirect: "/",
        thumbnailUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQu0Mo1q16-tlH3JqsbEwub5vcorpzy7a2WtQ&usqp=CAU",
        type: GameItemType.INTERNAL,
        active: false,
        isHashBorder: false,
        nextItems: []
      }];
  }

  getCurrentSystemFromLcSAndJson() {
    let currSys = getItemFromLocalStorage(GameItemType.CONSOLE);
    if (currSys) {
      this.fetchIaglService.getAnyJson<SystemIAGLModel>(currSys).subscribe((data: SystemIAGLModel) => {
        let viewSystem = convertSystemToViewable(data);
        this.currentMenu = viewSystem;
        this.addBasicMenuItems();
        this.appComponent.notify(viewSystem.name + " Loaded");
        this.resolveGamesList(data.gameslist);
      },
        error => {
          this.appComponent.notify("System fetch Failed", error);
        });
    } else {
      this.appComponent.notify("No System selected!", new Error("No System selected"));
    }
  }

  public resolveGamesList(gameslist: string[]) {
    let currCount = 0;
    from(gameslist).pipe(
      mergeMap(gameUrl => this.fetchIaglService.getAnyJson<GameIAGLModel>(gameUrl), 300)
    ).subscribe((data: GameIAGLModel) => {
      let viewSystem = convertGameToViewable(data);
      currCount += 1;
      this.currentMenu.nextItems.push(viewSystem);
      this.appComponent.notify(viewSystem.name + " (" + currCount + "/" + gameslist.length + ") Loaded");
      this.currentMenu.countDetail = currCount + " Games";
    },
      error => {
        this.appComponent.notify("System fetch Failed", error);
      });
  }

}
