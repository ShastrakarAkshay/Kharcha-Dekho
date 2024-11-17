import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ChartData, ChartOptions } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { ITransactionItem } from 'src/app/common/components/transaction/transaction.component';

export type ChartType = 'bar' | 'pie' | 'doughnut';

@Component({
  selector: 'app-bar-chart',
  standalone: true,
  imports: [CommonModule, BaseChartDirective, MatIconModule, MatButtonModule],
  templateUrl: './bar-chart.component.html',
  styleUrl: './bar-chart.component.scss',
})
export class BarChartComponent {
  isDataAvailable: boolean = false;
  private _type: ChartType = 'bar';

  @Input()
  public get type() {
    return this._type;
  }
  public set type(value: ChartType) {
    this._type = value;
    this.barChartData.datasets[0].borderRadius = this._type === 'bar' ? 8 : 0;
  }

  @Input()
  public set transactionItems(value: ITransactionItem[]) {
    if (!value) {
      value = [];
    }
    this._setChartConfig(value);
  }

  public barChartData: ChartData<ChartType> = {
    labels: [],
    datasets: [
      {
        label: '',
        data: [],
        borderWidth: 1,
        maxBarThickness: 20,
      },
    ],
  };

  public barChartOptions: ChartOptions<ChartType> = {
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

  private _setChartConfig(value: ITransactionItem[]) {
    this.isDataAvailable = !!value?.length;
    this.barChartData.labels = value.map((x) => x.label?.trim());
    this.barChartData.datasets[0].data = value.map((x) => x.amount);
    const colors = value.map((x) => x.iconBgColor || '#ffffff');
    this.barChartData.datasets[0].backgroundColor = colors;
    this.barChartData.datasets[0].borderColor = colors;
    this.barChartData = { ...this.barChartData };
  }
}
