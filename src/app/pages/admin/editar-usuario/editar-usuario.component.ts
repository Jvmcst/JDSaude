import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, ActivatedRoute, Router } from '@angular/router';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { PessoaService } from '../../../services/pessoa.service';
import { Pessoa, PessoaRequest } from '../../../models/pessoa.model';
import { cpfValidator, formatarCpf } from '../../../shared/cpf.utils';
import { OnlyNumbersDirective } from '../../../directives/only-numbers.directive';

@Component({
  selector: 'app-editar-usuario',
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule, OnlyNumbersDirective],
  templateUrl: './editar-usuario.component.html',
  styleUrls: ['./editar-usuario.component.scss']
})
export class EditarUsuarioComponent implements OnInit {
  pessoa: Pessoa | null = null;
  buscando  = true;
  salvando  = false;
  sucesso   = false;
  erro      = '';

  form: FormGroup = new FormGroup({
    nome:  new FormControl('', [Validators.required, Validators.minLength(4)]),
    cpf:   new FormControl('', [Validators.required, cpfValidator]),
    email: new FormControl('', [Validators.required, Validators.email]),
  });

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private pessoaService: PessoaService
  ) {
    this.form.get('cpf')!.valueChanges.subscribe(v => {
      const fmt = formatarCpf(v ?? '');
      if (fmt !== v) this.form.get('cpf')!.setValue(fmt, { emitEvent: false });
    });
  }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.pessoaService.buscarPorId(id).subscribe({
      next: p => {
        this.pessoa = p;
        this.form.patchValue({ nome: p.nome, cpf: p.cpf, email: p.email });
        this.buscando = false;
      },
      error: () => { this.pessoa = null; this.buscando = false; }
    });
  }

  salvar(): void {
    if (this.form.invalid || !this.pessoa) { this.form.markAllAsTouched(); return; }
    this.salvando = true;
    this.erro = '';

    const req: PessoaRequest = this.form.value;
    this.pessoaService.atualizar(this.pessoa.id, req).subscribe({
      next: () => {
        this.salvando = false;
        this.sucesso  = true;
        setTimeout(() => this.router.navigate(['/admin/usuarios']), 1500);
      },
      error: (err: any) => {
        this.erro     = err?.error?.message ?? 'Erro ao salvar. Tente novamente.';
        this.salvando = false;
      }
    });
  }
}
