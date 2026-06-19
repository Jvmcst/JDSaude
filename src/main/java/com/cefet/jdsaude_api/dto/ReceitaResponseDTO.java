package com.cefet.jdsaude_api.dto;

import com.cefet.jdsaude_api.model.Receita;
import lombok.Getter;

@Getter
public class ReceitaResponseDTO {

    private Long id;
    private String descricao;
    private AtendimentoResponseDTO atendimento;
    private MedicamentoResponseDTO medicamento;

    public ReceitaResponseDTO() { }

    public ReceitaResponseDTO(Receita entidade) {
        this.id = entidade.getId();
        this.descricao = entidade.getDescricao();
        this.atendimento = new AtendimentoResponseDTO(entidade.getAtendimento());
        this.medicamento = new MedicamentoResponseDTO(entidade.getMedicamento());
    }
}