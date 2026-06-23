package com.cefet.jdsaude_api.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Getter;

@Getter
public class PessoaEspecializacaoRequestDTO {

    @NotNull(message = "O profissional é obrigatório.")
    private Long idPessoaProfissional;

    @NotNull(message = "A especialização é obrigatória.")
    private Long idEspecializacao;
}