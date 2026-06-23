package com.cefet.jdsaude_api.repository;

import com.cefet.jdsaude_api.model.Pessoa;
import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.stereotype.Repository;

import java.nio.ByteBuffer;
import java.util.Optional;


@Repository
public interface PessoaRepository extends JpaRepository<Pessoa, Long> {


    Optional<Pessoa> findByEmailContainingIgnoreCase(String email);

    Optional<Pessoa> findByCpfContaining(String cpf);

    Optional<Pessoa> findByNomeContainingIgnoreCase(String nome);

    boolean existsByCpf(String cpf);
}
