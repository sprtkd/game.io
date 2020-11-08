import { Component, Input, OnInit } from '@angular/core';
import { GameMenuItem } from 'src/app/models/ui/game-item';

@Component({
  selector: 'app-main-bar',
  templateUrl: './main-bar.component.html',
  styleUrls: ['./main-bar.component.scss']
})
export class MainBarComponent implements OnInit {
  @Input() currentMenu: GameMenuItem;
  constructor() { }
  ngOnInit(): void {
  }
}
