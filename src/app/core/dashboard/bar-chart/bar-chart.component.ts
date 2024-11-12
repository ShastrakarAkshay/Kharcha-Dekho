import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ChartData, ChartOptions, scales } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { ITransactionItem } from 'src/app/common/components/transaction/transaction.component';

@Component({
  selector: 'app-bar-chart',
  standalone: true,
  imports: [CommonModule, BaseChartDirective],
  templateUrl: './bar-chart.component.html',
  styleUrl: './bar-chart.component.scss',
})
export class BarChartComponent {
  @Input()
  public set transactionItems(value: ITransactionItem[]) {
    if (value?.length) {
      console.log(value);
      this.barChartData.labels = value.map((x) => x.label?.trim());
      this.barChartData.datasets[0].data = value.map((x) => x.amount);
      const colors = value.map((x) => x.iconBgColor || '#ffffff');
      this.barChartData.datasets[0].backgroundColor = colors;
      this.barChartData.datasets[0].borderColor = colors;
      this.barChartData = { ...this.barChartData };
    }
  }

  public barChartData: ChartData<'bar'> = {
    labels: [],
    datasets: [
      {
        label: 'Amount',
        data: [],
        borderWidth: 1,
        borderRadius: 8,
        maxBarThickness: 20,
      },
    ],
  };

  public barChartOptions: ChartOptions<'bar'> = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
        position: 'top',
      },
    },
    scales: {
      x: {
        display: false,
      },
      y: {
        beginAtZero: true,
        display: false,
      },
    },
  };
}
