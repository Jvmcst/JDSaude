package com.cefet.jdsaude_api.dto;

import com.cefet.jdsaude_api.model.Usuario;
import com.cefet.jdsaude_api.model.enums.PerfilUsuario;
import lombok.Getter;

@Getter
public class UsuarioResponseDTO {

    private Long id;
    private String login;
    private PerfilUsuario perfil;
    private Long pessoaId;
    private String pessoaNome;

    public UsuarioResponseDTO(Usuario u) {
        this.id        = u.getId();
        this.login     = u.getLogin();
        this.perfil    = u.getPerfil();
        this.pessoaId  = u.getPessoa().getId();
        this.pessoaNome = u.getPessoa().getNome();
    }
}
