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

}
