package com.cefet.jdsaude_api.model;

import com.cefet.jdsaude_api.dto.MedicamentoRequestDTO;
import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@Entity
@Table(name = "tb_medicamento")
@Getter
@Setter
public class Medicamento {

    @Id@GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 150)
    private String nome;

    @Column(length = 150)
    private String descricao;

    public Medicamento(MedicamentoRequestDTO dto) {
        this.nome = dto.getNome();
        this.descricao = dto.getDescricao();
    }

    public Medicamento() {

    }
}
