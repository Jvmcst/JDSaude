package com.cefet.jdsaude_api.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;

@Getter
public class ReceitaRequestDTO {

    @NotBlank(message = "A descrição é obrigatória.")
    private String descricao;

    @NotNull(message = "O id do atendimento é obrigatório.")
    private Long idAtendimento;

    @NotNull(message = "O id do medicamento é obrigatório.")
    private Long idMedicamento;
}