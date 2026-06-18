package com.cefet.jdsaude_api.repository;

import com.cefet.jdsaude_api.model.Escala;
import jdk.jshell.Diag;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface EscalaRepository extends JpaRepository<Escala, Long> {
    List<Escala> findByPessoaProfissionalId(Long idProfissional);
}