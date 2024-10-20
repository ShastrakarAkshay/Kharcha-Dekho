import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconComponent } from '../../common/components/icon/icon.component';
import { getIcons } from './icon-list.constant';
import { IIcon } from './icon-list.interface';

@Component({
  selector: 'app-icon-list',
  standalone: true,
  imports: [CommonModule, IconComponent],
  templateUrl: './icon-list.component.html',
  styleUrls: ['./icon-list.component.scss'],
})
export class IconListComponent {
  icons: IIcon[] = [];
  @Output() iconSelect = new EventEmitter<IIcon>();

  ngOnInit(): void {
    this.icons = getIcons();
  }

  onIconSelect(icon: IIcon) {
    this.iconSelect.emit(icon);
  }
}
