import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';
import { FetchIaglService } from '../services/fetch-iagl.service';
import { BaseGitContentModel } from 'src/app/models/iagl/base_model';
import { GameItemType, GameMenuItem } from 'src/app/models/ui/game-item';
import { cleanData, convertSystemData, xmlToJson } from "./../models/iagl/iagl_utils";
import { convertSystemToViewable } from './../models/ui/viewable_utils';

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
    next: "/",
    nextItems: [],
    prev: "/",
    type: GameItemType.MASTER,
    url: "",
    cache: undefined,
    countDetail: "0 Systems",
    description: "Main menu"
  }
  constructor(private fetchIaglService: FetchIaglService, public appComponent: AppComponent) { }

  ngOnInit(): void {
    this.addBasicMenuItems();
    this.getListFromIAGL();
  }

  addBasicMenuItems() {
    this.currentMenu.nextItems = [
      {
        name: "Settings",
        url: "https://i.postimg.cc/X7SSnLHG/new.png",
        type: GameItemType.SYSTEM,
        active: false,
        isHashBorder: false,
        next: "/",
        nextItems: undefined,
        prev: "/"
      },
      {
        name: "Info",
        url: "https://i.pinimg.com/564x/16/b2/75/16b275a88d210734f768d4f0be2fd903.jpg",
        type: GameItemType.SYSTEM,
        active: false,
        isHashBorder: false,
        next: "/",
        nextItems: undefined,
        prev: "/"
      },
      {
        name: "Search",
        url: "https://i.pinimg.com/564x/d0/db/51/d0db51bfb8797366caebdf2a238849f0.jpg",
        type: GameItemType.SYSTEM,
        active: false,
        isHashBorder: false,
        next: "/",
        nextItems: undefined,
        prev: "/"
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
        this.appComponent.spinnerStop("IAGL Fetch Failed", error);
      });
  }

  async processAllSystems(datalist: BaseGitContentModel[]) {
    this.appComponent.spinnerStart("Fetching System data from IAGL");
    let syscount = 0;
    for (let data of datalist) {
      if (await this.fetchXmlToJsonData(data.download_url)) {
        syscount += 1;
        this.currentMenu.countDetail = syscount + " Systems Loaded";
      }
    }
    this.appComponent.spinnerStop("System fetch complete");
  }

  async fetchXmlToJsonData(url: string) {
    try {
      let data = await this.fetchIaglService.getXmlData(url).toPromise();
      let system = await convertSystemData(xmlToJson(data));
      if (!system) {
        return false;
      }
      this.currentMenu.nextItems.push(convertSystemToViewable(system));
      this.appComponent.notify("Fetch Success: " + system.name);
      return true;
    } catch (error) {
      this.appComponent.notify("IAGL Fetch Failed", error);
    }
    return false;
  }

}
