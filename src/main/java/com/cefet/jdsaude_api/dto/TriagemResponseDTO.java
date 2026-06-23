package com.cefet.jdsaude_api.dto;

import com.cefet.jdsaude_api.model.Triagem;
import lombok.Getter;
import java.time.LocalDateTime;

@Getter
public class TriagemResponseDTO {

    private Long id;
    private LocalDateTime dataRegistro;
    private String descricao;
    private AtendimentoResponseDTO atendimento;
    private PessoaResponseDTO pessoaProfissional;

    public TriagemResponseDTO() { }

    public TriagemResponseDTO(Triagem entidade) {
        this.id = entidade.getId();
        this.dataRegistro = entidade.getDataRegistro();
        this.descricao = entidade.getDescricao();
        this.atendimento = new AtendimentoResponseDTO(entidade.getAtendimento());
        this.pessoaProfissional = new PessoaResponseDTO(entidade.getPessoaProfissional());
    }
}