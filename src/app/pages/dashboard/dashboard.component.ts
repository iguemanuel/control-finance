import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { TransactionModalComponent } from '../../components/transaction-modal/transaction-modal.component';
import { CommonModule } from '@angular/common';
import { DashboardChartsComponent } from '../../components/dashboard-charts/dashboard-charts.component';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { CardComponent } from '../../components/card/card.component';
import { TransactionModel } from '../../models/transaction';
import { TransactionService } from '../../services/transaction/transaction.service';

@Component({
  standalone: true,
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  imports: [
    SidebarComponent,
    CommonModule,
    TransactionModalComponent,
    CardComponent,
  ],
})
export class DashboardComponent implements OnInit {
  entrada: number = 0;
  saida: number = 0;
  total: number = 0;
  userId: string | null = '';
  transactions: TransactionModel[] = [];

  constructor(
    private route: ActivatedRoute,
    private transactionService: TransactionService
  ) {}

  async ngOnInit(): Promise<void> {
    this.userId = this.route.snapshot.paramMap.get('userId');
    await this.fetchTransactions();
  }

  async fetchTransactions() {
    try {
      // Busca as transações
      this.transactions = await this.transactionService.getTransactions();

      // Filtra e soma os valores de "IN" (entrada)
      this.entrada = this.transactions
        .filter((transaction) => transaction.type === 'IN')
        .reduce((acc, curr) => acc + curr.value, 0);

      // Filtra e soma os valores de "OUT" (saída)
      this.saida = this.transactions
        .filter((transaction) => transaction.type === 'OUT')
        .reduce((acc, curr) => acc + curr.value, 0);

      // Calcula o total (entrada - saída)
      this.total = this.entrada - this.saida;
    } catch (error) {
      console.error('Erro ao carregar transações', error);
    }
  }
}
