import { Directive, HostListener } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[appUppercase]', // uso: <input appUppercase>
  standalone: false
})
export class UppercaseDirective {

  constructor(private control: NgControl) {}

  @HostListener('input', ['$event.target.value'])
  onInput(value: string): void {
    const upper = value.toUpperCase();
    // Atualiza o valor no formulário sem disparar novo evento
    this.control.control?.setValue(upper, { emitEvent: false });
  }
}