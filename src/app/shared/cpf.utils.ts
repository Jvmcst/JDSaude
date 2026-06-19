import { AbstractControl, ValidationErrors } from '@angular/forms';

/* Validacao do CPF com algoritmo dos digitos verificadores */
export function cpfValidator(ctrl: AbstractControl): ValidationErrors | null {
  const raw = (ctrl.value ?? '').replace(/\D/g, '');
  if (!raw) return null;
  if (raw.length !== 11) return { cpfInvalido: true };
  if (/^(\d)\1{10}$/.test(raw)) return { cpfInvalido: true };

  const calc = (len: number) => {
    let sum = 0;
    for (let i = 0; i < len; i++) sum += parseInt(raw[i]) * (len + 1 - i);
    const r = (sum * 10) % 11;
    return r >= 10 ? 0 : r;
  };

  if (calc(9) !== parseInt(raw[9]) || calc(10) !== parseInt(raw[10])) {
    return { cpfInvalido: true };
  }
  return null;
}

/* Formata CPF enquanto o usuario digita */
export function formatarCpf(value: string): string {
  const d = value.replace(/\D/g, '').slice(0, 11);
  if (d.length <= 3)  return d;
  if (d.length <= 6)  return `${d.slice(0,3)}.${d.slice(3)}`;
  if (d.length <= 9)  return `${d.slice(0,3)}.${d.slice(3,6)}.${d.slice(6)}`;
  return `${d.slice(0,3)}.${d.slice(3,6)}.${d.slice(6,9)}-${d.slice(9)}`;
}

/* Formata telefone enquanto o usuario digita */
export function formatarTelefone(value: string): string {
  const d = value.replace(/\D/g, '').slice(0, 11);
  if (d.length <= 2)  return `(${d}`;
  if (d.length <= 6)  return `(${d.slice(0,2)}) ${d.slice(2)}`;
  if (d.length <= 10) return `(${d.slice(0,2)}) ${d.slice(2,6)}-${d.slice(6)}`;
  return `(${d.slice(0,2)}) ${d.slice(2,7)}-${d.slice(7)}`;
}
