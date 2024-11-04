import { Component, EventEmitter, Optional, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  IconComponent,
  IconType,
} from '../../../common/components/icon/icon.component';
import { getIcons } from './icon-list.constant';
import { IIcon } from './icon-list.interface';
import { SearchComponent } from 'src/app/common/components/search/search.component';
import { SearchPipe } from 'src/app/common/pipes/search.pipe';
import { MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { HeaderComponent } from 'src/app/common/components/header/header.component';

@Component({
  selector: 'app-icon-list',
  standalone: true,
  imports: [
    CommonModule,
    IconComponent,
    SearchComponent,
    SearchPipe,
    MatButtonModule,
    HeaderComponent,
  ],
  templateUrl: './icon-list.component.html',
  styleUrls: ['./icon-list.component.scss'],
})
export class IconListComponent {
  icons: IIcon[] = [];
  searchText: string = '';
  heading: string = '';
  listType: IconType = IconType.NORMAL;

  constructor(@Optional() private _dialogRef: MatDialogRef<IconListComponent>) {
    if (this._dialogRef) {
      this.heading = 'Select Icon';
    }
  }

  ngOnInit(): void {
    this.icons = getIcons();
  }

  onIconSelect(icon: IIcon) {
    this._dialogRef?.close(icon);
  }

  onSearch(text: string) {
    this.searchText = text;
  }

  onCancel() {
    this._dialogRef?.close();
  }
}
