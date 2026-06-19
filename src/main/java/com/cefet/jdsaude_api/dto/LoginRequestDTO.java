package com.cefet.jdsaude_api.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class LoginRequestDTO {

    @NotBlank(message = "Login obrigatório")
    private String login;

    @NotBlank(message = "Senha obrigatória")
    private String senha;
}
