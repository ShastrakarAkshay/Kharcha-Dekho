import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search',
  standalone: true,
})
export class SearchPipe implements PipeTransform {
  transform(items: any[], searchText: string, prop: string = 'name'): any[] {
    if (!items) return [];
    if (!searchText.trim()) return items;

    searchText = searchText.trim().toLowerCase();
    return items.filter((item) => {
      return item[prop].toLowerCase().includes(searchText);
    });
  }
}
