package com.cefet.jdsaude_api.repository;

import com.cefet.jdsaude_api.model.Pessoa;
import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.stereotype.Repository;

import java.nio.ByteBuffer;
import java.util.List;
import java.util.Optional;


@Repository
public interface PessoaRepository extends JpaRepository<Pessoa, Long> {


    Optional<Pessoa> findByEmailContainingIgnoreCase(String email);

    Optional<Pessoa> findByCpfContaining(String cpf);

    List<Pessoa> findByNomeContainingIgnoreCase(String nome);

    boolean existsByCpf(String cpf);

    boolean existsByEmail(String email);

    Optional<Pessoa> findByEmail(String email);

    Optional<Pessoa> findByCpf(String cpf);
}
