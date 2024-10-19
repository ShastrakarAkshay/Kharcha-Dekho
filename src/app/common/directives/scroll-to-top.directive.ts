import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[scrollToTopOnFocus]',
  standalone: true,
})
export class ScrollToTopOnFocusDirective {
  @HostListener('focus', ['$event.target'])
  onFocus(): void {
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
  }
}
