package com.cefet.jdsaude_api.dto;

import com.cefet.jdsaude_api.model.enums.PerfilUsuario;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UsuarioRequestDTO {

    @NotBlank(message = "Login obrigatório")
    private String login;

    @NotBlank(message = "Senha obrigatória")
    private String senha;

    @NotNull(message = "Perfil obrigatório")
    private PerfilUsuario perfil;

    @NotNull(message = "Pessoa obrigatória")
    private Long pessoaId;
}
