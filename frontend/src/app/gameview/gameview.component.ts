import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';
import { GameIAGLModel, RomIAGLModel } from '../models/ui/basic_models';
import { GameItemType, GameMenuItem } from '../models/ui/game-item';
import { FetchIaglService } from '../services/fetch-iagl.service';
import { convertGameToViewable, convertRomToViewable, getItemFromLocalStorage } from '../utils/render_utils';

@Component({
  selector: 'app-gameview',
  templateUrl: './gameview.component.html',
  styleUrls: ['./gameview.component.scss']
})
export class GameviewComponent implements OnInit {
  currentMenu: GameMenuItem;
  constructor(private fetchIaglService: FetchIaglService, public appComponent: AppComponent) { }

  ngOnInit(): void {
    this.getCurrentGameFromLcSAndJson();
  }
  addBasicMenuItems() {
    this.currentMenu.nextItems = [
      {
        name: "Back To System",
        countDetail: "0",
        renderUrl: "",
        prevRedirect: "/",
        nextRedirect: "/system",
        thumbnailUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQu0Mo1q16-tlH3JqsbEwub5vcorpzy7a2WtQ&usqp=CAU",
        type: GameItemType.INTERNAL,
        active: false,
        isHashBorder: false,
        nextItems: []
      }];
  }

  getCurrentGameFromLcSAndJson() {
    let currSys = getItemFromLocalStorage(GameItemType.GAME);
    if (currSys) {
      this.fetchIaglService.getAnyJson<GameIAGLModel>(currSys).subscribe((data: GameIAGLModel) => {
        let viewGame = convertGameToViewable(data);
        this.currentMenu = viewGame;
        this.addBasicMenuItems();
        this.appComponent.notify(viewGame.name + " Loaded");
        this.resolveRomsList(data.romsList);
        this.currentMenu.countDetail = data.romsCount + " Roms";
      },
        error => {
          this.appComponent.notify("System fetch Failed", error);
        });
    } else {
      this.appComponent.notify("No Game selected!", new Error("No Game selected"));
    }
  }

  resolveRomsList(romlist: RomIAGLModel[]) {
    for (let rom of romlist) {
      this.currentMenu.nextItems.push(convertRomToViewable(rom));
    }
  }
}
