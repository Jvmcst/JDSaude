package com.cefet.jdsaude_api.model;

import com.cefet.jdsaude_api.dto.DiagnosticoRequestDTO;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "diagnostico")
public class Diagnostico {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String descricao;

    @ManyToOne
    @JoinColumn(name = "id_atendimento")
    private Atendimento atendimento;

    public Diagnostico() { }

    public Diagnostico(DiagnosticoRequestDTO dto, Atendimento atendimento) {
        this.descricao = dto.getDescricao();
        this.atendimento = atendimento;
    }
}