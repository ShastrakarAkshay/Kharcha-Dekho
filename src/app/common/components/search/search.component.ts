import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  input,
  output,
  signal,
  ViewChild,
} from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    FormsModule,
  ],
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent {
  searchText = signal<string>('');

  placeholder = input<string>('Search');
  searchTextChange = output<string>();

  @ViewChild('searchInput') inputRef!: ElementRef<HTMLElement>;

  constructor() {
    toObservable(this.searchText)
      .pipe(debounceTime(500))
      .subscribe(() => {
        this.searchTextChange.emit(this.searchText());
      });
  }
}
