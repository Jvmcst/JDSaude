package com.cefet.jdsaude_api.dto;


import jakarta.validation.constraints.*;
import lombok.Getter;

@Getter
public class PessoaRequestDTO {

    @NotBlank(message = "O nome é obrigatório.")
    @Size(min = 4, message = "O nome deve ter no mínimo 4 caracteres.")
    private String nome;

    @NotBlank(message = "O CPF é obrigatório.")
    @Size(min = 11, max = 14, message = "O CPF deve ter entre 11 e 14 caracteres.")
    private String cpf;

    @NotBlank(message = "O email é obrigatório.")
    @Email(message = "Insira um email valido")
    private String email;

}