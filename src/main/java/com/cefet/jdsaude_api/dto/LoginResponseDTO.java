package com.cefet.jdsaude_api.dto;

import com.cefet.jdsaude_api.model.enums.PerfilUsuario;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class LoginResponseDTO {

    private Long id;
    private String login;
    private PerfilUsuario perfil;
    private Long pessoaId;
    private String pessoaNome;
}
