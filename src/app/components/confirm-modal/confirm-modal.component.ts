import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-confirm-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
<div class="modal-backdrop" *ngIf="visivel" (click)="fechar()">
  <div class="modal-box" (click)="$event.stopPropagation()">
    <div class="modal-header">
      <div class="modal-icon" [class]="tipo">
        <i class="bi" [class.bi-exclamation-triangle]="tipo === 'perigo'" [class.bi-question-circle]="tipo === 'aviso'"></i>
      </div>
      <h3 class="modal-titulo">{{ titulo }}</h3>
      <p class="modal-mensagem">{{ mensagem }}</p>
    </div>

    <div class="modal-obs" *ngIf="pedirMotivo">
      <label class="obs-label">Motivo (opcional)</label>
      <textarea [(ngModel)]="motivo" rows="2" class="obs-input" placeholder="Informe o motivo..."></textarea>
    </div>

    <div class="modal-footer">
      <button class="btn-cancelar" (click)="fechar()">Voltar</button>
      <button class="btn-confirmar" [class]="tipo" (click)="confirmar()" [disabled]="carregando">
        <span *ngIf="!carregando">{{ labelConfirmar }}</span>
        <span *ngIf="carregando" class="spinner-border spinner-border-sm"></span>
      </button>
    </div>
  </div>
</div>`,
  styles: [`
    .modal-backdrop { position: fixed; inset: 0; background: rgba(0,0,0,.65); display: flex; align-items: center; justify-content: center; z-index: 1050; padding: 1rem; }
    .modal-box { background: #0e1a14; border: 1px solid rgba(90,219,148,.2); border-radius: 14px; padding: 2rem; width: 100%; max-width: 400px; }
    .modal-header { text-align: center; margin-bottom: 1.25rem; }
    .modal-icon { width: 52px; height: 52px; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto .9rem; font-size: 1.4rem; }
    .modal-icon.perigo { background: rgba(229,84,84,.12); color: #f08080; border: 1px solid rgba(229,84,84,.3); }
    .modal-icon.aviso  { background: rgba(219,175,90,.12); color: #dbb45a; border: 1px solid rgba(219,175,90,.3); }
    .modal-titulo { font-size: 1.1rem; font-weight: 700; color: #f0faf5; margin: 0 0 .4rem; }
    .modal-mensagem { font-size: .9rem; color: #7a9e8a; margin: 0; }
    .modal-obs { margin-bottom: 1.25rem; }
    .obs-label { display: block; font-size: .78rem; font-weight: 600; color: #7aaa8a; text-transform: uppercase; letter-spacing: .4px; margin-bottom: .4rem; }
    .obs-input { width: 100%; background: rgba(90,219,148,.05); border: 1px solid rgba(90,219,148,.2); border-radius: 8px; color: #e0f4ea; padding: .6rem .9rem; font-size: .9rem; resize: none; outline: none; }
    .modal-footer { display: flex; gap: .75rem; }
    .btn-cancelar { flex: 1; padding: .65rem; background: transparent; border: 1px solid rgba(90,219,148,.2); border-radius: 8px; color: #7aaa8a; cursor: pointer; font-size: .9rem; transition: .15s; }
    .btn-cancelar:hover { background: rgba(90,219,148,.05); }
    .btn-confirmar { flex: 1; padding: .65rem; border: none; border-radius: 8px; font-weight: 700; font-size: .9rem; cursor: pointer; transition: .15s; }
    .btn-confirmar.perigo { background: #e55454; color: #fff; }
    .btn-confirmar.aviso  { background: #dbb45a; color: #0a1a10; }
    .btn-confirmar:disabled { opacity: .5; cursor: not-allowed; }
  `]
})
export class ConfirmModalComponent {
  @Input() visivel     = false;
  @Input() titulo      = 'Confirmar ação';
  @Input() mensagem    = 'Tem certeza que deseja continuar?';
  @Input() tipo: 'perigo' | 'aviso' = 'perigo';
  @Input() labelConfirmar = 'Confirmar';
  @Input() pedirMotivo = false;
  @Input() carregando  = false;

  @Output() confirmado = new EventEmitter<string>();
  @Output() fechado    = new EventEmitter<void>();

  motivo = '';

  confirmar(): void { this.confirmado.emit(this.motivo); }
  fechar():    void { this.visivel = false; this.motivo = ''; this.fechado.emit(); }
}
