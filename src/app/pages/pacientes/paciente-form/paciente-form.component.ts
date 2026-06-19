import {
  Component, Input, Output, EventEmitter, OnChanges, SimpleChanges
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Pessoa, PessoaRequest } from '../../../models/pessoa.model';
import { OnlyNumbersDirective } from '../../../directives/only-numbers.directive';
import { cpfValidator, formatarCpf } from '../../../shared/cpf.utils';

@Component({
  selector: 'app-paciente-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink, OnlyNumbersDirective],
  templateUrl: './paciente-form.component.html',
  styleUrls: ['./paciente-form.component.scss']
})
export class PacienteFormComponent implements OnChanges {
  @Input()  paciente: Pessoa | null = null;
  @Input()  carregando = false;
  @Output() formSubmit = new EventEmitter<PessoaRequest>();
  @Output() cancelar   = new EventEmitter<void>();

  form: FormGroup = new FormGroup({
    nome:  new FormControl('', [Validators.required, Validators.minLength(4)]),
    cpf:   new FormControl('', [Validators.required, cpfValidator]),
    email: new FormControl('', [Validators.required, Validators.email]),
  });

  constructor() {
    // Máscara CPF
    this.form.get('cpf')!.valueChanges.subscribe(v => {
      const fmt = formatarCpf(v ?? '');
      if (fmt !== v) this.form.get('cpf')!.setValue(fmt, { emitEvent: false });
    });
  }

  get modoEdicao(): boolean { return !!this.paciente; }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['paciente'] && this.paciente) {
      this.form.patchValue({
        nome:  this.paciente.nome,
        cpf:   this.paciente.cpf,
        email: this.paciente.email,
      });
    }
  }

  get nome()  { return this.form.get('nome')!; }
  get cpf()   { return this.form.get('cpf')!; }
  get email() { return this.form.get('email')!; }

  onSubmit(): void {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    this.formSubmit.emit(this.form.value);
  }
}
