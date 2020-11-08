import { Component, OnInit } from '@angular/core';
import { BaseGitContentModel, SystemIAGLModel } from 'src/app/models/iagl/base_model';
import { GameItemType, GameMenuItem } from 'src/app/models/ui/game-item';
import { FetchIaglService } from "./../../services/fetch-iagl.service";
import { cleanData, convertSystemData, xmlToJson, populateMedia } from "./../../models/iagl/iagl_utils";
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-main-bar',
  templateUrl: './main-bar.component.html',
  styleUrls: ['./main-bar.component.scss']
})
export class MainBarComponent implements OnInit {
  gameItems: GameMenuItem[] = [];
  constructor(private fetchIaglService: FetchIaglService, public appComponent: AppComponent) { }

  ngOnInit(): void {
    this.addBasicMenuItems();
    this.getListFromIAGL();
  }

  addBasicMenuItems() {
    this.gameItems = [
      {
        name: "Settings",
        url: "https://i.postimg.cc/X7SSnLHG/new.png",
        type: GameItemType.SUBMENU,
        active: false,
        isHashBorder: false
      },
      {
        name: "Info",
        url: "https://i.pinimg.com/564x/16/b2/75/16b275a88d210734f768d4f0be2fd903.jpg",
        type: GameItemType.SUBMENU,
        active: false,
        isHashBorder: false
      },
      {
        name: "Search",
        url: "https://i.pinimg.com/564x/d0/db/51/d0db51bfb8797366caebdf2a238849f0.jpg",
        type: GameItemType.SUBMENU,
        active: false,
        isHashBorder: false
      }
    ]
  }

  getListFromIAGL() {
    this.appComponent.spinnerStart("Fetching from IAGL");
    this.fetchIaglService.getAllSystemXMLs().subscribe((data: BaseGitContentModel[]) => {
      cleanData(data);
      this.appComponent.spinnerStop("IAGL Fetch Success");
      this.processAllSystems(data);
    },
      error => {
        this.appComponent.spinnerStop("IAGL Fetch Failed");
      });
  }

  async processAllSystems(datalist: BaseGitContentModel[]) {
    this.appComponent.spinnerStart("Fetching System data from IAGL");
    for (let data of datalist) {
      await this.fetchXmlToJsonData(data.download_url);
    }
    this.appComponent.spinnerStop("System fetch complete");
  }

  async fetchXmlToJsonData(url: string) {
    try {
      let data = await this.fetchIaglService.getXmlData(url).toPromise();
      let system = convertSystemData(xmlToJson(data));
      if (!system.name) {
        return;
      }
      system.media = populateMedia(system.basename);
      this.convertSystemToViewable(system);
      this.appComponent.notify("Fetch Success: " + system.name);
    } catch (error) {
      this.appComponent.notify("IAGL Fetch Failed");
    }
  }

  convertSystemToViewable(system: SystemIAGLModel) {
    this.gameItems.push({
      name: system.name,
      url: system.media.thumbnail,
      type: system.gamesCount > 0 ? GameItemType.SUBMENU : GameItemType.GAME,
      active: false,
      isHashBorder: true
    })
  }


}
