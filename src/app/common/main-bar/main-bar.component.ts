import { Component, OnInit } from '@angular/core';
import { BaseGitContentModel, cleanData } from 'src/app/models/iagl/base_model';
import { GameItemType, GameMenuItem } from 'src/app/models/ui/game-item';
import { FetchIaglService } from "./../../services/fetch-iagl.service";
import { TopBarComponent } from "./../../common/top-bar/top-bar.component";
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
    this.addItems();
    this.getListFromIAGL();
  }

  addItems() {
    this.gameItems = [
      {
        name: "Settings",
        url: "https://i.postimg.cc/X7SSnLHG/new.png",
        type: GameItemType.SUBMENU,
        active: false
      },
      {
        name: "Info",
        url: "https://i.pinimg.com/564x/16/b2/75/16b275a88d210734f768d4f0be2fd903.jpg",
        type: GameItemType.SUBMENU,
        active: false
      },
      {
        name: "Call Of Duty WWII",
        url: "https://i.pinimg.com/564x/4d/f7/47/4df74770b950f0d977ea0e094cd419fa.jpg",
        type: GameItemType.GAME,
        active: false
      },
      {
        name: "Rocket League",
        url: "https://i.postimg.cc/sfkLSJhY/rl.png",
        type: GameItemType.GAME,
        active: false
      },
      {
        name: "Doom",
        url: "https://i.pinimg.com/236x/b2/1d/d7/b21dd7f6e2245d6bbfbb8b451bfed2df.jpg",
        type: GameItemType.GAME,
        active: false
      },
      {
        name: "Spiderman Miles Morales",
        url: "https://i.pinimg.com/564x/8f/16/7a/8f167aac8e5563efbcc2f8985ffc0dee.jpg",
        type: GameItemType.GAME,
        active: false
      }


    ]
  }

  getListFromIAGL() {
    this.appComponent.spinnerStart("Fetching from IAGL");
    this.fetchIaglService.getAllSystemXMLs().subscribe((data: BaseGitContentModel[]) => {
      cleanData(data);
      this.processAllSystems(data);
      this.appComponent.spinnerStop("IAGL fetch success");
    },
      error => {
        this.appComponent.spinnerStop("IAGL fetch failed");
      });
  }

  processAllSystems(datalist: BaseGitContentModel[]) {
    for (let data of datalist) {
      console.log(data.name);
      console.log(data.download_url);
    }
  }


}
