package com.cefet.jdsaude_api.repository;

import com.cefet.jdsaude_api.model.Medicamento;
import com.cefet.jdsaude_api.model.Receita;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Collection;
import java.util.List;

public interface ReceitaRepository extends JpaRepository<Receita, Long> {

    List<Receita> findByMedicamento(Medicamento medicamento);
    List<Receita> findByAtendimentoId(Long atendimentoid);
    List<Receita> findByMedicamentoId(Long medicamentoId);

}
