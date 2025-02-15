import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TransactionModel } from '../../models/transaction';

@Component({
  selector: 'app-transaction-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './transaction-modal.component.html',
  styleUrls: ['./transaction-modal.component.css'],
})
export class TransactionModalComponent {
  transaction: TransactionModel = new TransactionModel({
    name: '',
    type: 'IN',
    category: '',
    value: 0,
    description: '',
  });

  submitForm() {
    console.log(this.transaction.itemTransaction);
  }
}
