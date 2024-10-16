import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { COLORS, ICONS } from './icons.constant';

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
    this.icons = this.getIcons();
  }

  getIcons(): Icon[] {
    let count = -1;
    const icons = ICONS.map((item) => {
      count++;
      if (count >= 10) {
        count = 0;
      }
      return {
        icon: item,
        iconName: this.getLabel(item),
        bgColor: COLORS[count],
      };
    });
    return icons;
  }

  getLabel(icon: string) {
    return icon.split('_').join(' ');
  }

  onIconSelect(icon: string) {
    this.iconSelect.emit(icon);
  }
}
