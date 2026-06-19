package com.cefet.jdsaude_api.model;

import com.cefet.jdsaude_api.dto.PessoaRequestDTO;
import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@Entity
@Table(name = "tb_pessoa")
@Getter
@Setter
public class Pessoa {

    @Id@GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 150)
    private String nome;

    @Column(nullable = false, length = 50)
    private String email;

    @Column(nullable = false, length = 11)
    private String cpf;

    public Pessoa(PessoaRequestDTO dto) {
        this.nome = dto.getNome();
        this.cpf = dto.getCpf();
        this.email = dto.getEmail();
    }

    public Pessoa() {

    }
}
