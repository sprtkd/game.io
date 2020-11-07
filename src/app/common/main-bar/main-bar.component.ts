import { Component, OnInit } from '@angular/core';
import { GameItemType, GameMenuItem } from 'src/app/models/ui/game-item';

@Component({
  selector: 'app-main-bar',
  templateUrl: './main-bar.component.html',
  styleUrls: ['./main-bar.component.scss']
})
export class MainBarComponent implements OnInit {
  gameItems: GameMenuItem[] = [];
  constructor() { }

  ngOnInit(): void {
    this.addItems();
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


}
