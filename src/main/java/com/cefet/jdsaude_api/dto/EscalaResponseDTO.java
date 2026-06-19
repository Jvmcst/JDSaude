package com.cefet.jdsaude_api.dto;

import com.cefet.jdsaude_api.model.Escala;
import com.cefet.jdsaude_api.model.enums.DisponibilidadeEscala;
import lombok.Getter;
import java.time.LocalDate;
import java.time.LocalTime;

@Getter
public class EscalaResponseDTO {

    private Long id;
    private LocalDate data;
    private LocalTime horario;
    private DisponibilidadeEscala disponibilidade;
    private PessoaResponseDTO pessoaProfissional;

    public EscalaResponseDTO() { }

    public EscalaResponseDTO(Escala entidade) {
        this.id = entidade.getId();
        this.data = entidade.getData();
        this.horario = entidade.getHorario();
        this.disponibilidade = entidade.getDisponibilidade();
        this.pessoaProfissional = new PessoaResponseDTO(entidade.getPessoaProfissional());
    }
}