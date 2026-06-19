import { Pipe, PipeTransform } from '@angular/core';

/*
 * Formata as  datas ISO (YYYY-MM-DD ou ISO full) para dd/MM/yyyy.
 */

@Pipe({ name: 'dateBr', standalone: true })
export class DateBrPipe implements PipeTransform {
  transform(value: string | null | undefined, formato: 'date' | 'datetime' | 'short' = 'date'): string {
    if (!value) return '—';

    const date = value.includes('T') ? new Date(value) : new Date(value + 'T00:00:00');
    if (isNaN(date.getTime())) return value;

    const dd   = String(date.getDate()).padStart(2, '0');
    const mm   = String(date.getMonth() + 1).padStart(2, '0');
    const yyyy = date.getFullYear();
    const hh   = String(date.getHours()).padStart(2, '0');
    const min  = String(date.getMinutes()).padStart(2, '0');

    switch (formato) {
      case 'datetime': return `${dd}/${mm}/${yyyy} ${hh}:${min}`;
      case 'short':    return `${dd}/${mm}/${yyyy}`;
      default:         return `${dd}/${mm}/${yyyy}`;
    }
  }
}
