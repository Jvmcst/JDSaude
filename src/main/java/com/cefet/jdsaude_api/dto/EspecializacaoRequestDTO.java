package com.cefet.jdsaude_api.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;

@Getter
public class EspecializacaoRequestDTO {

    @NotBlank(message = "A descrição é obrigatória.")
    private String descricao;
}