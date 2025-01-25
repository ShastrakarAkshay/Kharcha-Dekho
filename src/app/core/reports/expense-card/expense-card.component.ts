import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { AmountPipe } from 'src/app/common/pipes/amount.pipe';

@Component({
  selector: 'app-expense-card',
  standalone: true,
  imports: [CommonModule, MatIconModule, AmountPipe],
  templateUrl: './expense-card.component.html',
  styleUrl: './expense-card.component.scss',
})
export class ExpenseCardComponent {
  @Input() amount: number = 0;
  @Input() label: string = '';
}
