import { Component, Input, OnInit } from '@angular/core';
import { GameMenuItem } from "./../../models/ui/game-item";

@Component({
  selector: 'app-menu-item',
  templateUrl: './menu-item.component.html',
  styleUrls: ['./menu-item.component.scss']
})
export class MenuItemComponent implements OnInit {
  @Input() gameItem: GameMenuItem;
  constructor() { }

  ngOnInit(): void {
  }

  hashCode(str: string) {
    if(!str) {
      return '5px solid black'
    }
    var hash = 0;
    for (var i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    var c = (hash & 0x00FFFFFF)
      .toString(16)
      .toUpperCase();

    let retcolor = "00000".substring(0, 6 - c.length) + c;
    retcolor = '#' + retcolor;
    return retcolor;
  }

}
