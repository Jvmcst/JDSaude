import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MedicamentoService } from '../../../services/medicamento.service';

@Component({
  selector: 'app-medicamento-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './medicamento-form.component.html',
  styleUrls: ['./medicamento-form.component.scss']
})
export class MedicamentoFormComponent implements OnInit {
  form: FormGroup = new FormGroup({
    nome:      new FormControl('', [Validators.required, Validators.minLength(2)]),
    descricao: new FormControl(''),
  });

  id: number | null = null;
  carregando = false;
  carregandoDados = false;
  sucesso = false;
  erro = '';

  get modoEdicao(): boolean { return this.id !== null; }

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private medicamentoService: MedicamentoService
  ) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.id = Number(idParam);
      this.carregarMedicamento(this.id);
    }
  }

  carregarMedicamento(id: number): void {
    this.carregandoDados = true;
    this.medicamentoService.buscarPorId(id).subscribe({
      next: m => {
        this.form.patchValue({ nome: m.nome, descricao: m.descricao });
        this.carregandoDados = false;
      },
      error: () => {
        this.erro            = 'Erro ao carregar medicamento.';
        this.carregandoDados = false;
      }
    });
  }

  salvar(): void {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    this.carregando = true;
    this.erro = '';

    const req = {
      nome:      this.form.value.nome.trim(),
      descricao: this.form.value.descricao?.trim() ?? '',
    };

    const op = this.modoEdicao
      ? this.medicamentoService.atualizar(this.id!, req)
      : this.medicamentoService.criar(req);

    op.subscribe({
      next: () => {
        this.carregando = false;
        this.sucesso    = true;
        setTimeout(() => this.router.navigate(['/medicamentos']), 1500);
      },
      error: err => {
        this.erro       = err?.error?.erro ?? err?.error?.message ?? 'Erro ao salvar. Tente novamente.';
        this.carregando = false;
      }
    });
  }

  campo(name: string) { return this.form.get(name); }
  invalido(name: string): boolean {
    const c = this.campo(name);
    return !!(c?.invalid && c?.touched);
  }
}
