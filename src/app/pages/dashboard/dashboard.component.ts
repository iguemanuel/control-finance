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
import { PieChartComponent } from '../../components/pie-chart/pie-chart.component';

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
    PieChartComponent,
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

  chartDataForPieChart: { series: number[]; labels: string[] } = {
    series: [0, 0],
    labels: [],
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
      console.log(
        'Transações:',
        this.transactions.map((t) => t.created) // Agora só imprime YYYY-MM-DD
      );

      this.calcularTotais();
      this.formatChartData(); // Formatar os dados do gráfico
    } catch (error) {
      console.error('Erro ao carregar transações:', error);
    }
  }

  formatChartData(): void {
    if (!this.transactions || this.transactions.length === 0) {
      console.warn('Nenhuma transação disponível para o gráfico.');
      return;
    }

    const groupedByMonth: {
      [month: string]: { receitas: number; despesas: number; total: number };
    } = {};

    this.transactions.forEach((transaction) => {
      const month = this.getMonthFromDate(transaction.created);

      if (!month) {
        console.warn('Transação sem data válida:', transaction);
        return;
      }

      if (!groupedByMonth[month]) {
        groupedByMonth[month] = { receitas: 0, despesas: 0, total: 0 };
      }

      if (transaction.type === 'IN') {
        groupedByMonth[month].receitas += transaction.value;
      } else if (transaction.type === 'OUT') {
        groupedByMonth[month].despesas += transaction.value;
      }

      groupedByMonth[month].total =
        groupedByMonth[month].receitas - groupedByMonth[month].despesas;
    });

    if (Object.keys(groupedByMonth).length === 0) {
      console.warn('Nenhum dado processado para o gráfico.');
      return;
    }

    // Extrair os dados formatados para o gráfico
    const categories = Object.keys(groupedByMonth); // Nome dos meses
    const receitasData = categories.map(
      (month) => groupedByMonth[month].receitas
    );
    const despesasData = categories.map(
      (month) => groupedByMonth[month].despesas
    );
    const totalData = categories.map((month) => groupedByMonth[month].total);

    // Atualizar os dados do gráfico principal
    this.chartData = {
      series: [
        { name: 'Receitas', data: receitasData },
        { name: 'Despesas', data: despesasData },
        { name: 'Total', data: totalData },
      ],
      categories: categories, // Agora temos os meses no eixo X
    };

    // Mantendo o gráfico de pizza sem alterações
    const receitas = this.totalReceitas();
    const despesas = this.totalDespesas();

    this.chartDataForPieChart = {
      series: [receitas, despesas],
      labels: ['Receitas', 'Despesas'],
    };

    console.log('Dados do gráfico principal:', this.chartData);
  }

  /**
   * Método para converter data YYYY-MM-DD para nome do mês (ex: 'Fevereiro 2025').
   */
  getMonthFromDate(date?: string): string {
    if (!date) {
      return 'Mês não disponível'; // Valor padrão caso a data seja undefined ou vazia
    }

    const dateObj = new Date(date);
    const month = dateObj.getMonth() + 1;
    const year = dateObj.getFullYear();

    // Mapeamento dos meses
    const months: string[] = [
      'Janeiro',
      'Fevereiro',
      'Março',
      'Abril',
      'Maio',
      'Junho',
      'Julho',
      'Agosto',
      'Setembro',
      'Outubro',
      'Novembro',
      'Dezembro',
    ];

    // Retorna o mês e ano no formato "Mês/Ano"
    return `${months[month - 1]}/${year}`;
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
