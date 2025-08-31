import {Component, OnInit, Inject, PLATFORM_ID} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-dark-mode-toggle',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dark-mode-toggle.component.html',
  styleUrls: ['./dark-mode-toggle.component.scss']
})
export class DarkModeToggleComponent implements OnInit {
  isDarkMode = false;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      // Check localStorage first
      const savedMode = localStorage.getItem('darkMode');
      if (savedMode === 'true') {
        this.isDarkMode = true;
        document.body.classList.add('dark-mode');
      } else if (savedMode === 'false') {
        this.isDarkMode = false;
        document.body.classList.remove('dark-mode');
      } else {
        // If no saved preference, check current body class
        this.isDarkMode = document.body.classList.contains('dark-mode');
      }
    }
  }

  toggleDarkMode() {
    if (isPlatformBrowser(this.platformId)) {
      this.isDarkMode = !this.isDarkMode;

      if (this.isDarkMode) {
        document.body.classList.add('dark-mode');
      } else {
        document.body.classList.remove('dark-mode');
      }

      localStorage.setItem('darkMode', this.isDarkMode.toString());
      console.log('Dark mode toggled:', this.isDarkMode); // Debug log
    }
  }
}
