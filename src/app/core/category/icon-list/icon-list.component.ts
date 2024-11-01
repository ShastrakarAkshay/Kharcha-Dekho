import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconComponent } from '../../../common/components/icon/icon.component';
import { getIcons } from './icon-list.constant';
import { IIcon } from './icon-list.interface';
import { SearchComponent } from 'src/app/common/components/search/search.component';
import { SearchPipe } from 'src/app/common/pipes/search.pipe';

@Component({
  selector: 'app-icon-list',
  standalone: true,
  imports: [CommonModule, IconComponent, SearchComponent, SearchPipe],
  templateUrl: './icon-list.component.html',
  styleUrls: ['./icon-list.component.scss'],
})
export class IconListComponent {
  icons: IIcon[] = [];
  searchText: string = '';
  @Output() iconSelect = new EventEmitter<IIcon>();

  ngOnInit(): void {
    this.icons = getIcons();
  }

  onIconSelect(icon: IIcon) {
    this.iconSelect.emit(icon);
  }

  onSearch(text: string) {
    this.searchText = text;
  }
}
