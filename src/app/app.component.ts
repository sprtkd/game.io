import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  isSpinning: Boolean = false;
  notifyMsg: string = "No Notification";
  lastNotificationSetTime: Date = null;

  ngOnInit(): void {
    this.notificationCleaner();
  }
  notificationCleaner() {
    setInterval(() => {
      if ((!this.isSpinning) && (this.lastNotificationSetTime == null
        || ((new Date().getTime() - this.lastNotificationSetTime.getTime()) / 1000) > 2)) {
        this.notifyMsg = "No Notification";
        this.lastNotificationSetTime = null;
      }
    }, 2000);
  }
  spinnerStart(msg: string) {
    this.isSpinning = true;
    this.notifyMsg = msg;
    this.lastNotificationSetTime = new Date();
  }

  spinnerStop(msg: string) {
    this.isSpinning = false;
    this.notifyMsg = msg;
    this.lastNotificationSetTime = new Date();
  }
  notify(msg: string) {
    this.notifyMsg = msg;
    this.lastNotificationSetTime = new Date();
  }

  getNotification() {
    return this.notifyMsg;
  }

  getSpinner() {
    return this.isSpinning;
  }

  getIfUpdated() {
    return this.lastNotificationSetTime!=null;
  }
}
