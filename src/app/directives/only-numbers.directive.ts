import { Directive, HostListener } from '@angular/core';

/**
 * nao deixo a digitacao de qualquer caractere nao numerico nos inputs
 */

@Directive({
  selector: '[onlyNumbers]',
  standalone: true
})
export class OnlyNumbersDirective {
  @HostListener('keydown', ['$event'])
  onKeyDown(e: KeyboardEvent): void {
    const allowed = [
      'Backspace','Delete','Tab','Escape','Enter','Home','End',
      'ArrowLeft','ArrowRight','ArrowUp','ArrowDown'
    ];
    if (allowed.includes(e.key)) return;
    if ((e.ctrlKey || e.metaKey) && ['a','c','v','x','z'].includes(e.key.toLowerCase())) return;
    if (!/^\d$/.test(e.key)) e.preventDefault();
  }

  @HostListener('paste', ['$event'])
  onPaste(e: ClipboardEvent): void {
    const paste = e.clipboardData?.getData('text') ?? '';
    if (!/^\d+$/.test(paste)) e.preventDefault();
  }
}
