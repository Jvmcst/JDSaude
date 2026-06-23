package com.cefet.jdsaude_api.repository;

import com.cefet.jdsaude_api.model.Medicamento;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface MedicamentoRepository extends JpaRepository<Medicamento, Long> {

    //Optional<Medicamento> findByNome(String nome);

    //Optional<Medicamento> findByDescricao(String descricao);

    List<Medicamento> findByNomeContainingIgnoreCase(String nome);

    List<Medicamento> findByDescricaoContainingIgnoreCase(String descricao);
}
