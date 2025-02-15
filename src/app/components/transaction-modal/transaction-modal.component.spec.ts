import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-transaction-modal',
  standalone: true,
  templateUrl: './transaction-modal.component.html',
  styleUrl: './transaction-modal.component.css',
})
export class TransactionModalComponent {
  ammount: number = 0;
  type: string = 'expense'; // Default: Gasto

  @Output() saveTransaction = new EventEmitter<{
    ammount: number;
    type: string;
  }>();
  @Output() closeModal = new EventEmitter<void>();

  onSave() {
    if (!this.ammount || this.ammount <= 0) {
      alert('Digite um valor válido!');
      return;
    }

    this.saveTransaction.emit({ ammount: this.ammount, type: this.type });
  }
}
