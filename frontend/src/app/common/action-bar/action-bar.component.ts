import { Component, Input, OnInit } from '@angular/core';
import { GameMenuItem } from 'src/app/models/ui/game-item';

@Component({
  selector: 'app-action-bar',
  templateUrl: './action-bar.component.html',
  styleUrls: ['./action-bar.component.scss']
})
export class ActionBarComponent implements OnInit {
  @Input() gameItems: GameMenuItem[] = [];
  constructor() { }

  ngOnInit(): void {
  }

}
