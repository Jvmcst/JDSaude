package com.cefet.jdsaude_api.dto;

import com.cefet.jdsaude_api.model.Pessoa;
import com.cefet.jdsaude_api.model.enums.SituacaoAtendimento;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Past;
import jakarta.validation.constraints.PastOrPresent;
import lombok.Getter;
import java.time.LocalDate;

@Getter
public class AtendimentoRequestDTO {

    @NotNull(message = "A data de realização é obrigatória.")
    private LocalDate dataRealizacao;

    @NotNull(message = "A data de registro é obrigatória.")
    @PastOrPresent(message = "A data de registro deve ser uma data que ja passou ou atual")
    private LocalDate dataRegistro;

    @NotNull(message = "A situação é obrigatória.")
    private SituacaoAtendimento situacao;

    @NotNull(message = "O id do paciente é obrigatório.")
    private Long idPessoaPaciente;

    @NotNull(message = "O id do profissional é obrigatório.")
    private Long idPessoaProfissional;
}