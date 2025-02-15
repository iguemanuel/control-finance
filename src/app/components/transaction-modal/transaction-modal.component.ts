import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-transaction-modal',
  standalone: true,
  imports: [CommonModule, FormsModule], // Importando FormsModule para suportar ngModel
  templateUrl: './transaction-modal.component.html',
  styleUrl: './transaction-modal.component.css',
})
export class TransactionModalComponent {
  amount: number = 0;
  type: string = 'expense'; // Default: Gasto

  @Output() saveTransaction = new EventEmitter<{
    amount: number;
    type: string;
  }>();
  @Output() closeModal = new EventEmitter<void>();

  onSave() {
    if (!this.amount || this.amount <= 0) {
      alert('Digite um valor válido!');
      return;
    }

    this.saveTransaction.emit({ amount: this.amount, type: this.type });
  }
}
