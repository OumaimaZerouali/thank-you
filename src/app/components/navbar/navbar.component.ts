import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DarkModeToggleComponent} from '../theme-switch/dark-mode-toggle.component';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, DarkModeToggleComponent],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  @Output() tabChange = new EventEmitter<'create' | 'list'>();
  selectedTab: 'create' | 'list' = 'create';

  selectTab(tab: 'create' | 'list') {
    this.selectedTab = tab;
    this.tabChange.emit(tab);
  }
}
