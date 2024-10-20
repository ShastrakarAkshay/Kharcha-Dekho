import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-icon',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.scss'],
})
export class IconComponent implements OnInit {
  iconLabel?: string;

  @Input({ required: true }) name: string = '';
  @Input() bgColor?: string;
  @Input() showLabel: boolean = true;

  ngOnInit(): void {
    this.iconLabel = this.name.split('_').join(' ');
  }
}
