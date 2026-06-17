package com.cefet.jdsaude_api.model;

import com.cefet.jdsaude_api.dto.ReceitaRequestDTO;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "receita")
public class Receita {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String descricao;

    @ManyToOne
    @JoinColumn(name = "id_atendimento")
    private Atendimento atendimento;

    @ManyToOne
    @JoinColumn(name = "id_medicamento")
    private Medicamento medicamento;

    public Receita() { }

    public Receita(ReceitaRequestDTO dto, Atendimento atendimento, Medicamento medicamento) {
        this.descricao = dto.getDescricao();
        this.atendimento = atendimento;
        this.medicamento = medicamento;
    }
}