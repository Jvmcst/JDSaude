package com.cefet.jdsaude_api.repository;

import com.cefet.jdsaude_api.model.Atendimento;
import com.cefet.jdsaude_api.model.Pessoa;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;

public interface AtendimentoRepository extends JpaRepository<Atendimento, Long> {

    List<Atendimento> findByPessoaPaciente(Pessoa paciente);
    List<Atendimento> findByPessoaPacienteId(Long id);
    List<Atendimento> findByPessoaProfissional(Pessoa paciente);
    List<Atendimento> findByPessoaProfissionalId(Long id);
    List<Atendimento> findByDataRealizacaoBetween(LocalDate dataInicial, LocalDate dataFinal);
    List<Atendimento> findByDataRealizacaoAfter(LocalDate dataInicial);
}
