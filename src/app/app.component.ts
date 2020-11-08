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
        || ((new Date().getTime() - this.lastNotificationSetTime.getTime()) / 1000) > 4)) {
        this.notifyMsg = "No Notification";
        this.lastNotificationSetTime = null;
      }
    }, 2000);
  }
  spinnerStart(msg: string) {
    this.isSpinning = true;
    this.notify(msg, undefined);
  }

  spinnerStop(msg: string, error?: Error) {
    this.isSpinning = false;
    this.notify(msg, error);
  }
  notify(msg: string, error?: Error) {
    if (error) { console.log(error); }
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
    return this.lastNotificationSetTime != null;
  }
}
