package com.cefet.jdsaude_api.model;

import com.cefet.jdsaude_api.dto.TriagemRequestDTO;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import java.time.LocalDateTime;

@Getter
@Setter
@Entity
@Table(name = "triagem")
public class Triagem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDateTime dataRegistro;
    private String descricao;

    @ManyToOne
    @JoinColumn(name = "id_atendimento")
    private Atendimento atendimento;

    @ManyToOne
    @JoinColumn(name = "id_pessoa_profissional")
    private Pessoa pessoaProfissional;

    public Triagem() { }

    public Triagem(TriagemRequestDTO dto, Atendimento atendimento, Pessoa profissional) {
        this.dataRegistro = LocalDateTime.now();
        this.descricao = dto.getDescricao();
        this.atendimento = atendimento;
        this.pessoaProfissional = profissional;
    }
}