import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { getIcons } from './icons.constant';

export interface Icon {
  icon: string;
  iconName: string;
  bgColor: string;
}

@Component({
  selector: 'app-icons',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './icons.component.html',
  styleUrls: ['./icons.component.scss'],
})
export class IconsComponent implements OnInit {
  icons: Icon[] = [];
  @Output() iconSelect = new EventEmitter<string>();

  ngOnInit(): void {
    this.icons = getIcons();
  }

  onIconSelect(icon: string) {
    this.iconSelect.emit(icon);
  }
}
