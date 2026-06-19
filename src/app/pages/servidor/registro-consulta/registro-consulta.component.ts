import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { RouterLink, ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AtendimentoService } from '../../../services/atendimento.service';
import { DiagnosticoService } from '../../../services/diagnostico.service';
import { ReceitaService } from '../../../services/receita.service';
import { MedicamentoService } from '../../../services/medicamento.service';
import { Atendimento } from '../../../models/atendimento.model';
import { Medicamento } from '../../../models/medicamento.model';
import { DateBrPipe } from '../../../pipes/date-br.pipe';
import { forkJoin, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

interface PrescricaoTemp {
  medicamento: Medicamento;
  descricao: string;
}

@Component({
  selector: 'app-registro-consulta',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, RouterLink, DateBrPipe],
  templateUrl: './registro-consulta.component.html',
  styleUrls: ['./registro-consulta.component.scss']
})
export class RegistroConsultaComponent implements OnInit, AfterViewInit {
  @ViewChild('canvasAssinatura') canvasRef!: ElementRef<HTMLCanvasElement>;

  atendimento: Atendimento | null = null;
  carregando  = true;
  salvando    = false;
  sucesso     = false;
  erro        = '';

  form: FormGroup = new FormGroup({
    observacoes: new FormControl(''),
  });

  termoDiag        = '';
  diagSelecionados: string[] = [];

  termoMed                            = '';
  sugestoesMed: Medicamento[]         = [];
  medicamentoSelecionado: Medicamento | null = null;
  descricaoReceita                    = '';
  prescricoes: PrescricaoTemp[]       = [];
  buscandoMed                         = false;

  private ctx!: CanvasRenderingContext2D;
  private desenhando = false;
  assinado           = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private atendimentoService: AtendimentoService,
    private diagnosticoService: DiagnosticoService,
    private receitaService: ReceitaService,
    private medicamentoService: MedicamentoService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.atendimentoService.buscarPorId(id).subscribe({
      next: a => { this.atendimento = a; this.carregando = false; },
      error: () => { this.carregando = false; }
    });
  }

  ngAfterViewInit(): void {
    setTimeout(() => this.initCanvas(), 300);
  }

  adicionarDiag(): void {
    if (!this.termoDiag.trim()) return;
    if (!this.diagSelecionados.includes(this.termoDiag.trim())) {
      this.diagSelecionados.push(this.termoDiag.trim());
    }
    this.termoDiag = '';
  }

  removerDiag(i: number): void { this.diagSelecionados.splice(i, 1); }

  buscarMed(): void {
    if (!this.termoMed.trim()) { this.sugestoesMed = []; return; }
    this.buscandoMed = true;
    this.medicamentoService.buscarPorNome(this.termoMed).subscribe({
      next: lista => { this.sugestoesMed = lista; this.buscandoMed = false; },
      error: () => { this.buscandoMed = false; }
    });
  }

  selecionarMed(m: Medicamento): void {
    this.medicamentoSelecionado = m;
    this.termoMed     = m.nome;
    this.sugestoesMed = [];
  }

  adicionarReceita(): void {
    if (!this.medicamentoSelecionado || !this.descricaoReceita.trim()) return;
    this.prescricoes.push({ medicamento: this.medicamentoSelecionado, descricao: this.descricaoReceita.trim() });
    this.medicamentoSelecionado = null;
    this.termoMed        = '';
    this.descricaoReceita = '';
  }

  removerReceita(i: number): void { this.prescricoes.splice(i, 1); }

  initCanvas(): void {
    if (!this.canvasRef) return;
    const canvas  = this.canvasRef.nativeElement;
    canvas.width  = canvas.offsetWidth  || 500;
    canvas.height = canvas.offsetHeight || 160;
    this.ctx = canvas.getContext('2d')!;
    this.ctx.strokeStyle = '#5ADB94';
    this.ctx.lineWidth   = 2;
    this.ctx.lineCap     = 'round';
    this.ctx.lineJoin    = 'round';
  }

  iniciarDesenho(e: MouseEvent | TouchEvent): void {
    this.desenhando = true;
    const pos = this.getPos(e);
    this.ctx.beginPath();
    this.ctx.moveTo(pos.x, pos.y);
  }

  desenhar(e: MouseEvent | TouchEvent): void {
    if (!this.desenhando) return;
    e.preventDefault();
    const pos = this.getPos(e);
    this.ctx.lineTo(pos.x, pos.y);
    this.ctx.stroke();
  }

  pararDesenho(): void {
    if (!this.desenhando) return;
    this.desenhando = false;
    this.assinado   = true;
  }

  limparAssinatura(): void {
    const c = this.canvasRef.nativeElement;
    this.ctx.clearRect(0, 0, c.width, c.height);
    this.assinado = false;
  }

  private getPos(e: MouseEvent | TouchEvent): { x: number; y: number } {
    const rect = this.canvasRef.nativeElement.getBoundingClientRect();
    if (e instanceof TouchEvent) {
      return { x: e.touches[0].clientX - rect.left, y: e.touches[0].clientY - rect.top };
    }
    return { x: (e as MouseEvent).clientX - rect.left, y: (e as MouseEvent).clientY - rect.top };
  }

  get formValido(): boolean {
    return this.diagSelecionados.length > 0 && this.assinado;
  }

  salvar(): void {
    if (!this.formValido || !this.atendimento) return;
    this.salvando = true;
    this.erro     = '';

    const idAtendimento = this.atendimento.id;

    const diagReqs = this.diagSelecionados.map(descricao =>
      this.diagnosticoService.criar({ descricao, idAtendimento }).pipe(catchError(() => of(null)))
    );
    const receitaReqs = this.prescricoes.map(p =>
      this.receitaService.criar({
        descricao: p.descricao, idAtendimento, idMedicamento: p.medicamento.id
      }).pipe(catchError(() => of(null)))
    );

    const todasReqs = [...diagReqs, ...receitaReqs];
    if (todasReqs.length === 0) { this.salvando = false; return; }

    forkJoin(todasReqs).subscribe({
      next: () => {
        this.atendimentoService.atualizar(idAtendimento, {
          dataRegistro:         this.atendimento!.dataRegistro,
          dataRealizacao:       this.atendimento!.dataRealizacao,
          situacao:             'CONCLUIDO',
          idPessoaPaciente:     this.atendimento!.pessoaPaciente.id,
          idPessoaProfissional: this.atendimento!.pessoaProfissional.id,
        }).subscribe({
          next:  () => { this.salvando = false; this.sucesso = true; setTimeout(() => this.router.navigate(['/servidor/consultas']), 1800); },
          error: () => { this.salvando = false; this.sucesso = true; setTimeout(() => this.router.navigate(['/servidor/consultas']), 1800); }
        });
      },
      error: () => {
        this.erro     = 'Erro ao salvar registros. Verifique e tente novamente.';
        this.salvando = false;
      }
    });
  }
}
