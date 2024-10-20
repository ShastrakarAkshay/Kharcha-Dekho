import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ScrollToTopOnFocusDirective } from 'src/app/common/directives/scroll-to-top.directive';
import { IconComponent } from 'src/app/common/components/icon/icon.component';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { IconListComponent } from '../icon-list/icon-list.component';
import { IIcon } from '../icon-list/icon-list.interface';

@Component({
  selector: 'app-create-category',
  standalone: true,
  imports: [
    CommonModule,
    MatSelectModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatButtonModule,
    FormsModule,
    ScrollToTopOnFocusDirective,
    IconComponent,
    MatBottomSheetModule,
    IconListComponent,
  ],
  templateUrl: './create-category.component.html',
  styleUrls: ['./create-category.component.scss'],
})
export class CreateCategoryComponent {
  showIconList: boolean = false;
  selectedIcon: IIcon = {
    icon: 'upload',
    bgColor: '#ececec',
    label: 'Select Icon',
  };

  openIconList() {
    this.showIconList = true;
  }

  onIconSelect(icon: IIcon) {
    this.showIconList = false;
    this.selectedIcon = icon;
  }
}
