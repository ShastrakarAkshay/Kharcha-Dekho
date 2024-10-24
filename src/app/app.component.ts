import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BottomMenuComponent } from './common/components/bottom-menu/bottom-menu.component';
import { SpinnerComponent } from './common/components/spinner/spinner.component';
import { SpinnerService } from './common/service/spinner.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterModule, BottomMenuComponent, SpinnerComponent],
})
export class AppComponent implements OnInit {
  isLoading: boolean = false;

  constructor(private _spinnerService: SpinnerService) {}

  ngOnInit() {
    this._spinnerService.loading$.subscribe((loading) => {
      this.isLoading = loading;
    });
  }
}
