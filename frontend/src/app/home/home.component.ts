import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';
import { FetchIaglService } from '../services/fetch-iagl.service';
import { GameItemType, GameMenuItem } from 'src/app/models/ui/game-item';
import { MasterInfoModel, SystemIAGLModel } from "../models/ui/basic_models";
import { convertSystemToViewable } from '../utils/render_utils';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  currentMenu: GameMenuItem = {
    active: false,
    isHashBorder: false,
    name: "Main Menu",
    nextItems: [],
    type: GameItemType.MASTER,
    countDetail: "0",
    nextRedirect: "/",
    prevRedirect: "/",
    renderUrl: "/",
    thumbnailUrl: "/"
  }
  constructor(private fetchIaglService: FetchIaglService, public appComponent: AppComponent) { }
  MAIN_URL = "assets/main.json";
  ngOnInit(): void {
    this.addBasicMenuItems();
    this.getSystems();
  }

  addBasicMenuItems() {
    this.currentMenu.nextItems = [
      {
        active: false,
        isHashBorder: false,
        name: "Settings",
        nextItems: [],
        type: GameItemType.INTERNAL,
        countDetail: "0",
        nextRedirect: "/settings",
        prevRedirect: "/",
        renderUrl: "/",
        thumbnailUrl: "https://i.postimg.cc/X7SSnLHG/new.png"
      },
      {
        active: false,
        isHashBorder: false,
        name: "Info",
        nextItems: [],
        type: GameItemType.INTERNAL,
        countDetail: "0",
        nextRedirect: "/info",
        prevRedirect: "/",
        renderUrl: this.MAIN_URL,
        thumbnailUrl: "https://i.pinimg.com/564x/16/b2/75/16b275a88d210734f768d4f0be2fd903.jpg"
      },
      {
        active: false,
        isHashBorder: false,
        name: "Search",
        nextItems: [],
        type: GameItemType.INTERNAL,
        countDetail: "0",
        nextRedirect: "/search",
        prevRedirect: "/",
        renderUrl: "/",
        thumbnailUrl: "https://i.pinimg.com/564x/d0/db/51/d0db51bfb8797366caebdf2a238849f0.jpg"
      }
    ]
  }

  getSystems() {
    this.appComponent.spinnerStart("Fetching Systems");
    this.fetchIaglService.getAnyJson(this.MAIN_URL).subscribe((data: MasterInfoModel) => {
      this.processSystems(data.systemlist);
      this.appComponent.spinnerStop("System List Fetched");
    },
      error => {
        this.appComponent.spinnerStop("Systems Fetch Failed", error);
      });
  }

  processSystems(systems: string[]) {
    let currCount = 0;
    for (let systemUrl of systems) {
      this.fetchIaglService.getAnyJson<SystemIAGLModel>(systemUrl).subscribe((data: SystemIAGLModel) => {
        let viewSystem = convertSystemToViewable(data);
        currCount += 1;
        this.currentMenu.nextItems.push(viewSystem);
        this.appComponent.notify(viewSystem.name + " (" + currCount + "/" + systems.length + ") Loaded");
        this.currentMenu.countDetail = currCount + " Systems";
      },
        error => {
          this.appComponent.notify("System fetch Failed", error);
        });
    }
  }


}
