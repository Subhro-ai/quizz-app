import { Injectable } from '@angular/core';
import { Question, QuizResults, UserAnswer } from '../models/quiz.model';

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  
  getQuizQuestions(): Question[] {
    return [
      {
        id: 1,
        text: 'Which of the following is NOT a core Angular feature?',
        options: [
          { id: 'a', text: 'Components' },
          { id: 'b', text: 'Services' },
          { id: 'c', text: 'Virtual DOM' },
          { id: 'd', text: 'Dependency Injection' }
        ],
        correctAnswerId: 'c'
      },
      {
        id: 2,
        text: 'What decorator do you use to define an Angular component?',
        options: [
          { id: 'a', text: '@NgComponent' },
          { id: 'b', text: '@Component' },
          { id: 'c', text: '@NgModule' },
          { id: 'd', text: '@Injectable' }
        ],
        correctAnswerId: 'b'
      },
      {
        id: 3,
        text: 'Which data binding syntax is used for one-way binding from component to view?',
        options: [
          { id: 'a', text: '{{ expression }}' },
          { id: 'b', text: '[property]="expression"' },
          { id: 'c', text: '(event)="handler"' },
          { id: 'd', text: '[(ngModel)]="property"' }
        ],
        correctAnswerId: 'a'
      },
      {
        id: 4,
        text: 'Which TypeScript feature allows you to create a new type by combining existing types?',
        options: [
          { id: 'a', text: 'Interfaces' },
          { id: 'b', text: 'Decorators' },
          { id: 'c', text: 'Union Types' },
          { id: 'd', text: 'Generics' }
        ],
        correctAnswerId: 'c'
      },
      {
        id: 5,
        text: 'In Angular, which of the following can be used to share data between components?',
        options: [
          { id: 'a', text: 'ViewChild' },
          { id: 'b', text: 'Content Projection' },
          { id: 'c', text: 'Services' },
          { id: 'd', text: 'All of the above' }
        ],
        correctAnswerId: 'd'
      },
      {
        id: 6,
        text: 'Which PrimeNG component would be most appropriate for displaying a list of items?',
        options: [
          { id: 'a', text: 'p-calendar' },
          { id: 'b', text: 'p-table' },
          { id: 'c', text: 'p-dialog' },
          { id: 'd', text: 'p-button' }
        ],
        correctAnswerId: 'b'
      },
      {
        id: 7,
        text: 'What is the Angular CLI command to generate a new component?',
        options: [
          { id: 'a', text: 'ng create component' },
          { id: 'b', text: 'ng add component' },
          { id: 'c', text: 'ng generate component' },
          { id: 'd', text: 'ng new component' }
        ],
        correctAnswerId: 'c'
      },
      {
        id: 8,
        text: 'Which Angular lifecycle hook is called after every check of a component\'s view?',
        options: [
          { id: 'a', text: 'ngOnInit' },
          { id: 'b', text: 'ngAfterViewInit' },
          { id: 'c', text: 'ngAfterViewChecked' },
          { id: 'd', text: 'ngOnDestroy' }
        ],
        correctAnswerId: 'c'
      },
      {
        id: 9,
        text: 'What is RxJS primarily used for in Angular?',
        options: [
          { id: 'a', text: 'Styling components' },
          { id: 'b', text: 'Managing asynchronous operations' },
          { id: 'c', text: 'Routing' },
          { id: 'd', text: 'Form validation' }
        ],
        correctAnswerId: 'b'
      },
      {
        id: 10,
        text: 'Which Angular feature helps with showing or hiding elements based on conditions?',
        options: [
          { id: 'a', text: 'ngIf' },
          { id: 'b', text: 'ngShow' },
          { id: 'c', text: 'ngDisplay' },
          { id: 'd', text: 'ngVisible' }
        ],
        correctAnswerId: 'a'
      }
    ];
  }

  calculateResults(questions: Question[], userAnswers: UserAnswer[]): QuizResults {
    let correctAnswers = 0;
    const questionsWithAnswers = [];

    for (const question of questions) {
      const userAnswer = userAnswers.find(a => a.questionId === question.id);
      
      if (!userAnswer) continue;
      
      const isCorrect = userAnswer.selectedOptionId === question.correctAnswerId;
      
      if (isCorrect) {
        correctAnswers++;
      }
      
      const userAnswerText = question.options.find(
        o => o.id === userAnswer.selectedOptionId
      )?.text || 'No answer';
      
      const correctAnswerText = question.options.find(
        o => o.id === question.correctAnswerId
      )?.text || '';
      
      questionsWithAnswers.push({
        question: question.text,
        userAnswer: userAnswerText,
        correctAnswer: correctAnswerText,
        isCorrect
      });
    }

    const percentageScore = Math.round((correctAnswers / questions.length) * 100);
    
    return {
      totalQuestions: questions.length,
      correctAnswers,
      percentageScore,
      questionsWithAnswers
    };
  }
}
