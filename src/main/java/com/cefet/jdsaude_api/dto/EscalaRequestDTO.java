package com.cefet.jdsaude_api.dto;

import com.cefet.jdsaude_api.model.enums.DisponibilidadeEscala;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import java.time.LocalDate;
import java.time.LocalTime;

@Getter
public class EscalaRequestDTO {

    @NotNull(message = "A data é obrigatória.")
    private LocalDate data;

    @NotNull(message = "O horário é obrigatório.")
    private LocalTime horario;

    @NotNull(message = "A disponibilidade é obrigatória.")
    private DisponibilidadeEscala disponibilidade;

    @NotNull(message = "O profissional é obrigatório.")
    private Long idPessoaProfissional;
}