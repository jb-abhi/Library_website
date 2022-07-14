import { Component } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { AuthGuard } from './auth-guard.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'Frontend';

  showHead: boolean = false;

  constructor(private router: Router, authGuard: AuthGuard) {
    router.events.forEach((event) => {
      if (event instanceof NavigationStart) {
        // if (event['url'] == '/login' || event['url'] == '/') {
        //   this.showHead = false;
        // } else {
        //   // console.log("NU")
        //   this.showHead = true;
        // }
        if (event['url'] == '/login') {
          this.showHead = false;
        } else {
          this.showHead = true;
        }
      }
    });
  }
}
