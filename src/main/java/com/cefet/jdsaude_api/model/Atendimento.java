package com.cefet.jdsaude_api.model;


import com.cefet.jdsaude_api.dto.AtendimentoRequestDTO;
import com.cefet.jdsaude_api.model.enums.SituacaoAtendimento;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@Entity
@Table(name="atendimento")
public class Atendimento {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDate dataRegistro;
    private LocalDate dataRealizacao;

    @Enumerated(EnumType.STRING)
    private SituacaoAtendimento situacao;

    @ManyToOne
    @JoinColumn(name = "id_pessoa_paciente")
    private Pessoa pessoaPaciente;

    @ManyToOne
    @JoinColumn(name = "id_pessoa_profissional")
    private Pessoa pessoaProfissional;

    public Atendimento() { }

    public Atendimento(AtendimentoRequestDTO dto, Pessoa paciente, Pessoa profissional) {
        this.dataRegistro = LocalDate.now();
        this.dataRealizacao = dto.getDataRealizacao();
        this.situacao = dto.getSituacao();
        this.pessoaPaciente = paciente;
        this.pessoaProfissional = profissional;
    }
}