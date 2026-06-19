package com.cefet.jdsaude_api.dto;

import com.cefet.jdsaude_api.model.PessoaEspecializacao;
import lombok.Getter;

@Getter
public class PessoaEspecializacaoResponseDTO {

    private Long id;
    private PessoaResponseDTO pessoaProfissional;
    private EspecializacaoResponseDTO especializacao;

    public PessoaEspecializacaoResponseDTO() { }

    public PessoaEspecializacaoResponseDTO(PessoaEspecializacao entidade) {
        this.id = entidade.getId();
        this.pessoaProfissional = new PessoaResponseDTO(entidade.getPessoaProfissional());
        this.especializacao = new EspecializacaoResponseDTO(entidade.getEspecializacao());
    }
}