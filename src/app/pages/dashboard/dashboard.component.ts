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
    DashboardChartsComponent,
  ],
})
export class DashboardComponent implements OnInit {
  entrada: number = 0;
  saida: number = 0;
  total: number = 0;
  userId: string | null = null;
  transactions: TransactionModel[] = [];

  // Dados formatados para o gráfico
  chartData: { series: ApexAxisChartSeries; categories: string[] } = {
    series: [],
    categories: [],
  };

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
      console.log('Transações:', this.transactions);
      this.calcularTotais();
      this.formatChartData(); // Formatar os dados do gráfico
    } catch (error) {
      console.error('Erro ao carregar transações:', error);
    }
  }

  // Método para formatar os dados do gráfico
  formatChartData(): void {
    const categories = this.transactions.map((transaction) => transaction.name);
    const series = this.transactions.map((transaction) => transaction.value);
    const receitas = this.totalReceitas();
    const despesas = this.totalDespesas();

    this.chartData = {
      series: [{ name: 'Transações', data: [receitas, despesas] }],
      categories: ['Receitas', 'Despesas'],
    };
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
    console.log('Atualizando!'); // Atualiza as transações
  }
}
