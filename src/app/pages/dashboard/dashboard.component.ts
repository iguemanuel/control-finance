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
    NavbarComponent,
    DashboardChartsComponent,
  ],
})
export class DashboardComponent implements OnInit {
  entrada: number = 0;
  saida: number = 0;
  total: number = 0;
  userId: string | null = null;
  transactions: TransactionModel[] = [];

  constructor(
    private route: ActivatedRoute,
    private transactionService: TransactionService
  ) {}

  async ngOnInit(): Promise<void> {
    this.userId = this.route.snapshot.paramMap.get('userId');
    await this.fetchTransactions();
  }

  async fetchTransactions(): Promise<void> {
    try {
      const user = this.userId || '';
      console.log(user);

      this.transactions = await this.transactionService.getTransactionByUserId(
        user
      );
      this.calcularTotais();
    } catch (error) {
      console.error('Erro ao carregar transações:', error);
    }
  }

  totalReceitas(): number {
    return this.transactions
      .filter((transaction) => transaction.type === 'IN')
      .reduce((acc, curr) => acc + curr.value, 0);
  }

  totalDespesas(): number {
    return this.transactions
      .filter((transaction) => transaction.type === 'OUT')
      .reduce((acc, curr) => acc + curr.value, 0);
  }

  calcularTotal(): number {
    return this.totalReceitas() - this.totalDespesas();
  }

  calcularTotais(): void {
    this.entrada = this.totalReceitas();
    this.saida = this.totalDespesas();
    this.total = this.calcularTotal();
  }

  onTransactionAdded(): void {
    this.fetchTransactions();
  }
}
