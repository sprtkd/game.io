import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss']
})
export class TopBarComponent implements OnInit {
  nowtime: string;
  constructor() { }

  ngOnInit(): void {
    this.dateRefresh()
  }

  dateRefresh() {
    setInterval(() => {
      this.nowtime = formatDate(new Date(), 'MMM d, y h:mm a', 'en-US');
    }, 50);
  }
}
