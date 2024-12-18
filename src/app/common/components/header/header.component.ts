import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatRippleModule } from '@angular/material/core';
import { DropdownComponent } from '../dropdown/dropdown.component';
import { MatChipsModule } from '@angular/material/chips';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    MatMenuModule,
    MatButtonModule,
    MatIconModule,
    MatRippleModule,
    DropdownComponent,
    MatChipsModule,
  ],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  @Input() heading: string = '';
  @Input() badge: string = '';
  @Input() showLogo: boolean = false;
}
