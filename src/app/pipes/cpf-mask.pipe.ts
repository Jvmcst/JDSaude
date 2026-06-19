import { Pipe, PipeTransform } from '@angular/core';

/*
 * Formatar uma string de CPF para o padrao 000.000.000-00.
 * Aceita tbm o CPF com ou sem a formatacao
 */

@Pipe({ name: 'cpfMask', standalone: true })
export class CpfMaskPipe implements PipeTransform {
  transform(value: string | null | undefined): string {
    if (!value) return '';
    const digits = value.replace(/\D/g, '');
    if (digits.length !== 11) return value;
    return digits.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  }
}
