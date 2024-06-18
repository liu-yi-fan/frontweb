import { Component, Input, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent {
  @Input() memberID!: number;
  // memberIcon = false;
  memberState = '未登入';

  constructor(private router: Router) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['memberID'] && this.memberID > 0) {
      this.memberState = '登入者 :Amy Owen';
    }
  }

  goHome() {
    window.location.href = 'https://localhost:7066/HomePage/Search';
  }

  // navigateToPackages() {
  //   this.router.navigate(['/packages']);
  // }
}
