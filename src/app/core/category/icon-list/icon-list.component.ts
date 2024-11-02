import { Component, EventEmitter, Optional, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconComponent } from '../../../common/components/icon/icon.component';
import { getIcons } from './icon-list.constant';
import { IIcon } from './icon-list.interface';
import { SearchComponent } from 'src/app/common/components/search/search.component';
import { SearchPipe } from 'src/app/common/pipes/search.pipe';
import { MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-icon-list',
  standalone: true,
  imports: [
    CommonModule,
    IconComponent,
    SearchComponent,
    SearchPipe,
    MatButtonModule,
  ],
  templateUrl: './icon-list.component.html',
  styleUrls: ['./icon-list.component.scss'],
})
export class IconListComponent {
  icons: IIcon[] = [];
  searchText: string = '';

  constructor(
    @Optional() private _dialogRef: MatDialogRef<IconListComponent>
  ) {}

  ngOnInit(): void {
    this.icons = getIcons();
  }

  onIconSelect(icon: IIcon) {
    this._dialogRef.close(icon);
  }

  onSearch(text: string) {
    this.searchText = text;
  }

  onCancel() {
    this._dialogRef.close();
  }
}
