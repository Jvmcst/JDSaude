package com.cefet.jdsaude_api.repository;

import com.cefet.jdsaude_api.model.PessoaEspecializacao;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PessoaEspecializacaoRepository extends JpaRepository<PessoaEspecializacao, Long> {
    List<PessoaEspecializacao> findByPessoaProfissionalId(Long idProfissional);
    List<PessoaEspecializacao> findByEspecializacaoId(Long idEspecializacao);
}