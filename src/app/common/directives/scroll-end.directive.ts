import {
  Directive,
  Output,
  EventEmitter,
  HostListener,
  Input,
} from '@angular/core';

@Directive({
  selector: '[appScrollEnd]',
  standalone: true,
})
export class ScrollEndDirective {
  @Output() scrollEnd = new EventEmitter<void>();
  @Input() threshold = 100;

  @HostListener('scrollend', ['$event'])
  onScroll(event: Event): void {
    const target = event.target as HTMLElement;
    const position = target.scrollTop + target.clientHeight;
    const height = target.scrollHeight;

    if (position > height - this.threshold) {
      this.scrollEnd.emit();
    }
  }
}
