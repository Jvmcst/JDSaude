package com.cefet.jdsaude_api.repository;

import com.cefet.jdsaude_api.model.PessoaEspecializacao;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PessoaEspecializacaoRepository extends JpaRepository<PessoaEspecializacao, Long> {

    List<PessoaEspecializacao> findByPessoaProfissionalId(Long idProfissional);

    List<PessoaEspecializacao> findByEspecializacaoId(Long idEspecializacao);

    boolean existsByPessoaProfissionalIdAndEspecializacaoId(Long idProfissional, Long idEspecializacao);
}
