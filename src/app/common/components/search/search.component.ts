import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { debounceTime, Subject } from 'rxjs';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, MatIconModule, MatInputModule],
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  private _inputChange = new Subject<string>();

  searchText: string = '';

  @Input() placeholder = 'Search';
  @Output() searchTextChange = new EventEmitter<string>();

  ngOnInit(): void {
    this._inputChange
      .asObservable()
      .pipe(debounceTime(500))
      .subscribe((searchText) => {
        this.searchText = searchText;
        this.searchTextChange.emit(searchText);
      });
  }

  onInput(text: string) {
    this._inputChange.next(text);
  }

  onClear() {
    this.searchText = '';
    this.searchTextChange.emit('');
  }
}
