import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TransactionModel } from '../../models/transaction';
import { TransactionService } from '../../services/transaction/transaction.service';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
  standalone: true,
  imports: [CommonModule],
})
export class TableComponent {
  @Input() transactions: TransactionModel[] = [];
  @Output() transactionDeleted = new EventEmitter<void>();

  constructor(private transactionService: TransactionService) {}

  deleteTransaction(transactionId: string): void {
    Swal.fire({
      title: 'Tem certeza?',
      text: 'Essa ação não poderá ser desfeita.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim, quero excluir!',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.transactionService
          .deleteTransaction(transactionId)
          .then(() => {
            this.transactionDeleted.emit(); // Notifica o Dashboard para atualizar
            console.log('Transação removida com sucesso!');
          })
          .catch((error) => console.error('Erro ao remover transação:', error));
      }
    });
  }
}
