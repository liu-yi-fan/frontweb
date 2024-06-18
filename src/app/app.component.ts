import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'frontweb';

  memberID!: number;

  onActivate(component: any) {
    if (component.memberIDChange) {
      component.memberIDChange.subscribe((id: number) => {
        this.memberID = id;
      });
    }
  }
}
