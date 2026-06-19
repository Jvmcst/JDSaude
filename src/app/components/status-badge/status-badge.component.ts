import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SituacaoAtendimento } from '../../models/atendimento.model';

interface BadgeConfig { label: string; cssClass: string; }

@Component({
  selector: 'app-status-badge',
  standalone: true,
  imports: [CommonModule],
  template: `<span class="status-badge status-{{ config.cssClass }}">{{ config.label }}</span>`,
  styles: [`
    .status-badge {
      display: inline-block;
      padding: 3px 10px;
      border-radius: 20px;
      font-size: 11px;
      font-weight: 700;
      letter-spacing: .3px;
      text-transform: uppercase;
      white-space: nowrap;
    }
    .status-agendado      { background: rgba(90,184,219,.15); color: #5ab8db; border: 1px solid rgba(90,184,219,.3); }
    .status-em_andamento  { background: rgba(219,175,90,.15); color: #dbb45a; border: 1px solid rgba(219,175,90,.3); }
    .status-concluido     { background: rgba(90,219,148,.15); color: #5ADB94; border: 1px solid rgba(90,219,148,.3); }
    .status-cancelado     { background: rgba(229,84,84,.12);  color: #f08080; border: 1px solid rgba(229,84,84,.3);  }
  `]
})
export class StatusBadgeComponent {
  @Input() status: SituacaoAtendimento | string = '';

  private readonly map: Record<string, BadgeConfig> = {
    AGENDADO:     { label: 'Agendado',      cssClass: 'agendado'     },
    EM_ANDAMENTO: { label: 'Em andamento',  cssClass: 'em_andamento' },
    CONCLUIDO:    { label: 'Concluído',     cssClass: 'concluido'    },
    CANCELADO:    { label: 'Cancelado',     cssClass: 'cancelado'    },
  };

  get config(): BadgeConfig {
    return this.map[this.status] ?? { label: String(this.status), cssClass: 'agendado' };
  }
}
