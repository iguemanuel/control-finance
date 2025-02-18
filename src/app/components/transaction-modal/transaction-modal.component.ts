import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TransactionModel } from '../../models/transaction';
import { TransactionService } from '../../services/transaction/transaction.service';
import { AuthService } from '../../services/auth/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-transaction-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './transaction-modal.component.html',
  styleUrls: ['./transaction-modal.component.css'],
})
export class TransactionModalComponent implements OnInit {
  loggedUserId: string = '';

  transaction: TransactionModel = new TransactionModel({
    userId: '',
    name: '',
    type: '',
    category: '',
    value: 0,
    description: '',
  });

  updateTransactionType() {
    this.transaction.type = this.transaction.category;
  }

  isModalVisible: boolean = false;

  constructor(
    private transactionService: TransactionService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.loggedUserId = this.authService.getUserId() || '';
  }

  validateForm(): boolean {
    if (!this.transaction.name || !this.transaction.category) {
      Swal.fire({
        title: 'Erro',
        text: 'Todos os campos obrigatórios devem ser preenchidos!',
        icon: 'error',
      });
      return false;
    }

    // Verificar se o valor é um número válido
    if (isNaN(this.transaction.value) || this.transaction.value <= 0) {
      Swal.fire({
        title: 'Erro',
        text: 'O valor deve ser um número positivo!',
        icon: 'error',
      });
      return false;
    }

    return true;
  }

  async submitForm() {
    this.updateTransactionType();
    if (!this.validateForm()) {
      return; // Se a validação falhar, não envia o formulário
    }

    try {
      this.transaction.userId = this.loggedUserId;
      const newTransaction = await this.transactionService.createTransaction(
        this.transaction
      );
      console.log('Transação criada:', newTransaction);
      Swal.fire({
        title: 'Transação criada com sucesso!',
        icon: 'success',
        draggable: true,
      });

      setTimeout(() => {
        window.location.reload();
      }, 30000);

      this.isModalVisible = false;

      window.location.reload();
    } catch (error) {
      console.error('Erro ao criar transação:', error);
      Swal.fire({
        title: 'Erro',
        text: 'Ocorreu um erro ao criar a transação.',
        icon: 'error',
      });
    }
  }
}
