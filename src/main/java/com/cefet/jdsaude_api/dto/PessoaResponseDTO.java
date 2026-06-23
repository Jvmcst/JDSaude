package com.cefet.jdsaude_api.dto;

import com.cefet.jdsaude_api.model.Pessoa;
import lombok.Getter;

@Getter
public class PessoaResponseDTO {

    private Long id;
    private String nome;
    private String cpf;
    private String email;

    public PessoaResponseDTO() {

    }

    public PessoaResponseDTO(Pessoa entidade)
    {
        this.id = entidade.getId();
        this.nome = entidade.getNome();
        this.cpf = entidade.getCpf();
        this.email = entidade.getEmail();
    }
}