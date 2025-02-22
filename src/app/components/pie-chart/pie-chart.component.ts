import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { NgApexchartsModule, ChartComponent } from 'ng-apexcharts';
import { NgIf } from '@angular/common';
import {
  ApexNonAxisChartSeries,
  ApexChart,
  ApexDataLabels,
  ApexResponsive,
  ApexLegend,
} from 'ng-apexcharts';

// Define a tipagem para as opções do gráfico
export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  responsive: ApexResponsive[];
  legend: ApexLegend;
  labels: string[];
};

@Component({
  selector: 'app-pie-chart',
  standalone: true,
  imports: [NgApexchartsModule, NgIf],
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.css'],
})
export class PieChartComponent implements OnChanges {
  @Input() chartData!: { series: number[]; labels: string[] };

  public chartOptions: Partial<ChartOptions> = {}; // Garantindo inicialização

  constructor() {
    this.chartOptions = {
      series: [0, 0], // Inicializando com valores padrão
      chart: {
        type: 'pie',
        width: 380,
      },
      dataLabels: {
        enabled: true,
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200,
            },
            legend: {
              position: 'bottom',
            },
          },
        },
      ],
      legend: {
        position: 'top',
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
      labels: this.chartData.labels,
    };
  }
}
