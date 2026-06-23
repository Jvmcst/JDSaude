package com.cefet.jdsaude_api.dto;

import com.cefet.jdsaude_api.model.Especializacao;
import lombok.Getter;

@Getter
public class EspecializacaoResponseDTO {

    private Long id;
    private String descricao;

    public EspecializacaoResponseDTO() { }

    public EspecializacaoResponseDTO(Especializacao entidade) {
        this.id = entidade.getId();
        this.descricao = entidade.getDescricao();
    }
}