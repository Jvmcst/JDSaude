package com.cefet.jdsaude_api.repository;

import com.cefet.jdsaude_api.model.Triagem;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
public interface TriagemRepository extends JpaRepository<Triagem, Long> {

    List<Triagem> findByPessoaProfissionalId(Long idProfissional);
    List<Triagem> findByAtendimentoId(Long idAtendimento);
}
