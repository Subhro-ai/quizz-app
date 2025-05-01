import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  standalone: true,
  imports: [CommonModule, ButtonModule, CardModule, RouterModule]
})
export class HomeComponent {
  features = [
    {
      title: 'Interactive Questions',
      description: 'Answer multiple-choice questions about Angular concepts and features.'
    },
    {
      title: 'Real-time Feedback',
      description: 'Get instant feedback on your answers as you progress through the quiz.'
    },
    {
      title: 'Progress Tracking',
      description: 'Track your quiz progress with a visual progress bar.'
    },
    {
      title: 'Detailed Results',
      description: 'See a detailed breakdown of your performance at the end of the quiz.'
    }
  ];
}