package com.cefet.jdsaude_api.dto;

import com.cefet.jdsaude_api.model.Diagnostico;
import lombok.Getter;

@Getter
public class DiagnosticoResponseDTO {

    private Long id;
    private String descricao;
    private AtendimentoResponseDTO atendimento;

    public DiagnosticoResponseDTO() { }

    public DiagnosticoResponseDTO(Diagnostico entidade) {
        this.id = entidade.getId();
        this.descricao = entidade.getDescricao();
        this.atendimento = new AtendimentoResponseDTO(entidade.getAtendimento());
    }
}