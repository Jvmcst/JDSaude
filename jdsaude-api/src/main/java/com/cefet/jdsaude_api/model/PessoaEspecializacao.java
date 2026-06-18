package com.cefet.jdsaude_api.model;

import com.cefet.jdsaude_api.dto.PessoaEspecializacaoRequestDTO;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "pessoa_especializacao")
public class PessoaEspecializacao {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "id_pessoa_profissional")
    private Pessoa pessoaProfissional;

    @ManyToOne
    @JoinColumn(name = "id_especializacao")
    private Especializacao especializacao;

    public PessoaEspecializacao() { }

    public PessoaEspecializacao(Pessoa profissional, Especializacao especializacao) {
        this.pessoaProfissional = profissional;
        this.especializacao = especializacao;
    }
}