package com.cefet.jdsaude_api.repository;

import com.cefet.jdsaude_api.model.Escala;
import com.cefet.jdsaude_api.model.enums.DisponibilidadeEscala;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface EscalaRepository extends JpaRepository<Escala, Long> {

    List<Escala> findByPessoaProfissionalId(Long idProfissional);

    List<Escala> findByData(LocalDate data);

    List<Escala> findByDataBetween(LocalDate inicio, LocalDate fim);

    List<Escala> findByDisponibilidade(DisponibilidadeEscala disponibilidade);

    List<Escala> findByPessoaProfissionalIdAndDataBetween(Long idProfissional, LocalDate inicio, LocalDate fim);
}
