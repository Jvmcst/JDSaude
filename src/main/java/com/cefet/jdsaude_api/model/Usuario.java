package com.cefet.jdsaude_api.model;

import com.cefet.jdsaude_api.dto.UsuarioRequestDTO;
import com.cefet.jdsaude_api.model.enums.PerfilUsuario;
import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@Entity
@Table(name = "tb_usuario")
@Getter
@Setter
public class Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true, length = 100)
    private String login;

    @Column(nullable = false, length = 255)
    private String senha;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private PerfilUsuario perfil;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "pessoa_id", nullable = false)
    private Pessoa pessoa;

    public Usuario() {}

    public Usuario(UsuarioRequestDTO dto, Pessoa pessoa) {
        this.login  = dto.getLogin();
        this.senha  = dto.getSenha();
        this.perfil = dto.getPerfil();
        this.pessoa = pessoa;
    }
}
