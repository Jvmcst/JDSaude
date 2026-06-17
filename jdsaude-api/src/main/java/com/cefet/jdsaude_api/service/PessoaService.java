package com.cefet.jdsaude_api.service;

import com.cefet.jdsaude_api.dto.PessoaRequestDTO;
import com.cefet.jdsaude_api.dto.PessoaResponseDTO;
import com.cefet.jdsaude_api.model.Pessoa;
import com.cefet.jdsaude_api.repository.PessoaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class PessoaService {

    @Autowired
    private PessoaRepository pessoaRepository;

    //listagens
    @Transactional(readOnly = true)
    public List<PessoaResponseDTO> listarTodos() {
        return pessoaRepository.findAll()
                .stream()
                .map(PessoaResponseDTO::new)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public PessoaResponseDTO buscarPorId(Long id) {
        Pessoa pessoa = pessoaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Pessoa não encontrada com o Id: " + id));
        return new PessoaResponseDTO(pessoa);
    }

    @Transactional(readOnly = true)
    public PessoaResponseDTO buscarPorEmail(String email) {
        Pessoa pessoa = pessoaRepository.findByEmailContainingIgnoreCase(email)
                .orElseThrow(() -> new RuntimeException("Pessoa não encontrada com o email: " + email));
        return new PessoaResponseDTO(pessoa);
    }

    @Transactional(readOnly = true)
    public PessoaResponseDTO buscarPorCpf(String cpf) {
        Pessoa pessoa = pessoaRepository.findByCpfContaining(cpf)
                .orElseThrow(() -> new RuntimeException("Pessoa não encontrada com o CPF: " + cpf));
        return new PessoaResponseDTO(pessoa);
    }

    @Transactional(readOnly = true)
    public PessoaResponseDTO buscarPorNome(String nome) {
        Pessoa pessoa = pessoaRepository.findByNomeContainingIgnoreCase(nome)
                .orElseThrow(() -> new RuntimeException("Pessoa não encontrada com o nome: " + nome));
        return new PessoaResponseDTO(pessoa);
    }

    //salvar
    @Transactional
    public PessoaResponseDTO salvar(PessoaRequestDTO dto) {
        if (pessoaRepository.existsByCpf(dto.getCpf())) {
            throw new RuntimeException("CPF já cadastrado.");
        }
        Pessoa pessoa = new Pessoa(dto);
        return new PessoaResponseDTO(pessoaRepository.save(pessoa));
    }

    //alterações
    @Transactional
    public PessoaResponseDTO alterar(Long id, PessoaRequestDTO dto) {
        Pessoa pessoa = pessoaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Pessoa não encontrada com o Id: " + id));

        if (pessoaRepository.existsByCpf(dto.getCpf()) && !pessoa.getCpf().equals(dto.getCpf())) {
            throw new RuntimeException("CPF já cadastrado.");
        }

        pessoa.setNome(dto.getNome());
        pessoa.setCpf(dto.getCpf());
        pessoa.setEmail(dto.getEmail());
        return new PessoaResponseDTO(pessoaRepository.save(pessoa));
    }

    //exclusao
    @Transactional
    public void excluir(Long id) {
        Pessoa pessoa = pessoaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Pessoa não encontrada com o Id: " + id));
        pessoaRepository.delete(pessoa);
    }

}