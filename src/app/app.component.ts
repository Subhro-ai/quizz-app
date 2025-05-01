import { Component } from '@angular/core';
import { ToastModule } from 'primeng/toast';
import { CommonModule } from '@angular/common';
import { MessageService } from 'primeng/api';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [CommonModule, ToastModule, RouterModule],
  providers: [MessageService]
})
export class AppComponent {
  title = 'Interactive Quiz Application';
  isDarkMode = false;
  
  constructor() {
    // Check if dark mode preference exists in local storage
    const savedTheme = localStorage.getItem('quizAppTheme');
    if (savedTheme === 'dark') {
      this.isDarkMode = true;
      document.body.classList.add('dark-theme');
    }
  }
  
  toggleTheme() {
    this.isDarkMode = !this.isDarkMode;
    
    if (this.isDarkMode) {
      document.body.classList.add('dark-theme');
      localStorage.setItem('quizAppTheme', 'dark');
    } else {
      document.body.classList.remove('dark-theme');
      localStorage.setItem('quizAppTheme', 'light');
    }
  }
}
