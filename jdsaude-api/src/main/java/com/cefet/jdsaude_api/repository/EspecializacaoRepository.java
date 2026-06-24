package com.cefet.jdsaude_api.repository;

import com.cefet.jdsaude_api.model.Especializacao;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EspecializacaoRepository extends JpaRepository<Especializacao, Long> {

    List<Especializacao> findByDescricaoContainingIgnoreCase(String descricao);

    boolean existsByDescricaoIgnoreCase(String descricao);
}
