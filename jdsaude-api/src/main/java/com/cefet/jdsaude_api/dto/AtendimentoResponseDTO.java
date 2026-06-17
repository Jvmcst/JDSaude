package com.cefet.jdsaude_api.dto;

import com.cefet.jdsaude_api.model.Atendimento;
import com.cefet.jdsaude_api.model.enums.SituacaoAtendimento;
import lombok.Getter;
import java.time.LocalDate;

@Getter
public class AtendimentoResponseDTO {

    private Long id;
    private LocalDate dataRegistro;
    private LocalDate dataRealizacao;
    private SituacaoAtendimento situacao;
    private PessoaResponseDTO pessoaPaciente;
    private PessoaResponseDTO pessoaProfissional;

    public AtendimentoResponseDTO() { }

    public AtendimentoResponseDTO(Atendimento entidade) {
        this.id = entidade.getId();
        this.dataRegistro = entidade.getDataRegistro();
        this.dataRealizacao = entidade.getDataRealizacao();
        this.situacao = entidade.getSituacao();
        this.pessoaPaciente = new PessoaResponseDTO(entidade.getPessoaPaciente());
        this.pessoaProfissional = new PessoaResponseDTO(entidade.getPessoaProfissional());
    }
}