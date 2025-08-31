import {CommonModule, isPlatformBrowser} from '@angular/common';
import {Component, Inject, PLATFORM_ID} from '@angular/core';
import {NavbarComponent} from './components/navbar/navbar.component';
import {CardCreatorComponent} from './components/cards/card-creator.component';
import {CardListComponent} from './components/cards/card-list.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, NavbarComponent, CardCreatorComponent, CardListComponent],
  template: `
    <app-navbar (tabChange)="setActiveTab($event)"></app-navbar>

    <div *ngIf="selectedTab === 'create'">
      <app-card-creator></app-card-creator>
    </div>

    <div *ngIf="selectedTab === 'list'">
      <app-card-list></app-card-list>
    </div>
  `
})
export class AppComponent {
  selectedTab: 'create' | 'list' = 'create';

  constructor(@Inject(PLATFORM_ID) private readonly platformId: Object) {
    if (isPlatformBrowser(this.platformId)) {
      // Initialize dark mode from localStorage
      if (localStorage.getItem('darkMode') === 'true') {
        document.body.classList.add('dark-mode');
      }
    }
  }

  setActiveTab(tab: 'create' | 'list'): void {
    this.selectedTab = tab;
  }
}
