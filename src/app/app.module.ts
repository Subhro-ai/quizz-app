import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter, withComponentInputBinding } from '@angular/router';

// Application Components
import { AppComponent } from './app.component';
import { QuizComponent } from './components/quiz/quiz.component';
import { HomeComponent } from './components/home/home.component';

// Services
import { QuizService } from './services/quiz.service';

// Routes
export const routes = [
  { path: '', component: HomeComponent },
  { path: 'quiz', component: QuizComponent },
  { path: '**', redirectTo: '' }
];

// We're using standalone components, so we provide the providers for use by those components
export const appProviders = [
  QuizService,
  provideAnimations(),
  provideRouter(routes, withComponentInputBinding())
];
