package com.cefet.jdsaude_api.model;

import com.cefet.jdsaude_api.dto.EspecializacaoRequestDTO;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "especializacao")
public class Especializacao {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String descricao;

    public Especializacao() { }

    public Especializacao(EspecializacaoRequestDTO dto) {
        this.descricao = dto.getDescricao();
    }
}