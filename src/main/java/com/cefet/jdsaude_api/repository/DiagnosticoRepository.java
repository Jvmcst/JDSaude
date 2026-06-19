package com.cefet.jdsaude_api.repository;

import com.cefet.jdsaude_api.model.Diagnostico;
import jdk.jshell.Diag;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
public interface DiagnosticoRepository extends JpaRepository<Diagnostico, Long> {

    List<Diagnostico> findByDescricaoContainingIgnoreCase(String nome);
    List<Diagnostico> findByAtendimentoId(Long atendimentoId);
}
