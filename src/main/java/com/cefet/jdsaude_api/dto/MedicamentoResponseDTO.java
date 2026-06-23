package com.cefet.jdsaude_api.dto;

import com.cefet.jdsaude_api.model.Medicamento;
import lombok.Getter;

@Getter
public class MedicamentoResponseDTO {

    private Long id;
    private String nome;
    private String descricao;

    public MedicamentoResponseDTO() {

    }

    public MedicamentoResponseDTO(Medicamento entidade) {
        this.id = entidade.getId();
        this.nome = entidade.getNome();
        this.descricao = entidade.getDescricao();
    }
}
