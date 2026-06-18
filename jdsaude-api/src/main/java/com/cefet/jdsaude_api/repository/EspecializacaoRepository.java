package com.cefet.jdsaude_api.repository;

import com.cefet.jdsaude_api.model.Especializacao;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface EspecializacaoRepository extends JpaRepository<Especializacao, Long> {
    List<Especializacao> findByDescricaoContainingIgnoreCase(String descricao);
}
