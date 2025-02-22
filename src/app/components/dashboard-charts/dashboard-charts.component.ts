import {
  Component,
  ViewChild,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { NgApexchartsModule, ChartComponent } from 'ng-apexcharts';
import { NgIf } from '@angular/common';
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexDataLabels,
  ApexPlotOptions,
  ApexYAxis,
  ApexTitleSubtitle,
  ApexXAxis,
  ApexFill,
  ApexTooltip,
  ApexStroke,
  ApexLegend,
} from 'ng-apexcharts';

// Define a tipagem para as opções do gráfico
export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  yaxis: ApexYAxis;
  xaxis: ApexXAxis;
  fill: ApexFill;
  tooltip: ApexTooltip;
  stroke: ApexStroke;
  legend: ApexLegend;
  title: ApexTitleSubtitle;
};

@Component({
  selector: 'app-dashboard-charts',
  standalone: true,
  imports: [NgApexchartsModule, NgIf],
  templateUrl: './dashboard-charts.component.html',
  styleUrl: './dashboard-charts.component.css',
})
export class DashboardChartsComponent implements OnChanges {
  @ViewChild('chart') chart!: ChartComponent;

  // 📌 Adicionando entrada de dados para tornar o gráfico dinâmico
  @Input() chartData!: { series: ApexAxisChartSeries; categories: string[] };

  public chartOptions: Partial<ChartOptions> = {}; // Garantindo inicialização

  constructor() {
    this.chartOptions = {
      series: [],
      chart: {
        type: 'bar',
        height: 350,
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '55%',
          borderRadius: 10,
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        show: true,
        width: 2,
        colors: ['transparent'],
      },
      xaxis: {
        categories: [],
      },
      yaxis: {
        title: {
          text: 'R$ (Reais)',
        },
      },
      fill: {
        opacity: 1,
      },
      tooltip: {
        y: {
          formatter: function (val) {
            return 'R$ ' + val + ' Reais';
          },
        },
      },
      title: {
        text: 'Gráfico de movimentações financeiras',
        align: 'center',
      },
      legend: {
        position: 'bottom',
      },
    };
  }

  // 📌 Atualiza os dados quando `chartData` mudar
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['chartData'] && this.chartData) {
      this.updateChartData();
    }
  }

  // Método para atualizar os dados do gráfico dinamicamente
  private updateChartData(): void {
    this.chartOptions = {
      ...this.chartOptions,
      series: this.chartData.series,
      xaxis: {
        categories: this.chartData.categories,
      },
    };
  }
}
