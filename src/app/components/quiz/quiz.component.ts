import { Component, OnInit } from '@angular/core';
import { Question, QuizResults, UserAnswer } from '../../models/quiz.model';
import { QuizService } from '../../services/quiz.service';
import { CardModule } from 'primeng/card';
import { ProgressBarModule } from 'primeng/progressbar';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    CardModule,
    ProgressBarModule
  ]
})
export class QuizComponent implements OnInit {
  questions: Question[] = [];
  currentQuestionIndex = 0;
  selectedOption: string | null = null;
  userAnswers: UserAnswer[] = [];
  isQuizCompleted = false;
  quizResults: QuizResults | null = null;
  disableSubmit = true;
  showFeedback = false;
  isCorrectAnswer = false;
  
  constructor(
    private quizService: QuizService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initializeQuiz();
  }

  initializeQuiz(): void {
    this.questions = this.quizService.getQuizQuestions();
    this.currentQuestionIndex = 0;
    this.selectedOption = null;
    this.userAnswers = [];
    this.isQuizCompleted = false;
    this.quizResults = null;
    this.disableSubmit = true;
    this.showFeedback = false;
  }

  get currentQuestion(): Question {
    return this.questions[this.currentQuestionIndex];
  }

  get progressValue(): number {
    return ((this.currentQuestionIndex + 1) / this.questions.length) * 100;
  }

  get progressText(): string {
    return `Question ${this.currentQuestionIndex + 1} of ${this.questions.length}`;
  }

  onOptionSelect(optionId: string): void {
    this.selectedOption = optionId;
    this.disableSubmit = false;
  }

  submitAnswer(): void {
    if (this.selectedOption === null) {
      return;
    }

    this.isCorrectAnswer = this.selectedOption === this.currentQuestion.correctAnswerId;
    
    // Save user answer
    this.userAnswers.push({
      questionId: this.currentQuestion.id,
      selectedOptionId: this.selectedOption
    });

    // Show feedback
    this.showFeedback = true;

    // Move to next question or complete quiz
    setTimeout(() => {
      if (this.currentQuestionIndex < this.questions.length - 1) {
        this.currentQuestionIndex++;
        this.selectedOption = null;
        this.disableSubmit = true;
        this.showFeedback = false;
      } else {
        this.completeQuiz();
      }
    }, 1500);
  }

  getCorrectAnswerText(): string {
    const correctOptionId = this.currentQuestion.correctAnswerId;
    const correctOption = this.currentQuestion.options.find(
      option => option.id === correctOptionId
    );
    return correctOption ? correctOption.text : '';
  }

  completeQuiz(): void {
    this.isQuizCompleted = true;
    this.quizResults = this.quizService.calculateResults(this.questions, this.userAnswers);
  }

  restartQuiz(): void {
    this.initializeQuiz();
  }

  getOptionClass(optionId: string): string {
    if (!this.selectedOption) return '';
    
    const isSelected = optionId === this.selectedOption;
    const isCorrect = optionId === this.currentQuestion.correctAnswerId;
    
    if (isSelected && isCorrect) {
      return 'correct-option';
    } else if (isSelected && !isCorrect) {
      return 'incorrect-option';
    } else if (isCorrect) {
      return 'correct-option';
    }
    
    return '';
  }
  
  navigateToHome(): void {
    this.router.navigate(['/']);
  }
}
