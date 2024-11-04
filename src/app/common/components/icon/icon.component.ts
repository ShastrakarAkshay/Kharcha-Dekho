import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

export enum IconType {
  BG = 'bg',
  NORMAL = 'normal',
}

@Component({
  selector: 'app-icon',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.scss'],
})
export class IconComponent implements OnInit {
  @Input({ required: true }) name: string = '';
  @Input() bgColor?: string;
  @Input() label?: string;
  @Input() type: IconType = IconType.BG;

  ngOnInit(): void {}
}
