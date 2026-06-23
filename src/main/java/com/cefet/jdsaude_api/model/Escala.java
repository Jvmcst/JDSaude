package com.cefet.jdsaude_api.model;

import com.cefet.jdsaude_api.dto.EscalaRequestDTO;
import com.cefet.jdsaude_api.model.enums.DisponibilidadeEscala;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import java.time.LocalDate;
import java.time.LocalTime;

@Getter
@Setter
@Entity
@Table(name = "escala")
public class Escala {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDate data;
    private LocalTime horario;

    @Enumerated(EnumType.STRING)
    private DisponibilidadeEscala disponibilidade;

    @ManyToOne
    @JoinColumn(name = "id_pessoa_profissional")
    private Pessoa pessoaProfissional;

    public Escala() { }

    public Escala(EscalaRequestDTO dto, Pessoa profissional) {
        this.data = dto.getData();
        this.horario = dto.getHorario();
        this.disponibilidade = dto.getDisponibilidade();
        this.pessoaProfissional = profissional;
    }
}