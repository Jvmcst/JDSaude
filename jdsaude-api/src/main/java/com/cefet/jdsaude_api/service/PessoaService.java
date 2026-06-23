package com.cefet.jdsaude_api.service;

import com.cefet.jdsaude_api.dto.PessoaRequestDTO;
import com.cefet.jdsaude_api.dto.PessoaResponseDTO;
import com.cefet.jdsaude_api.exceptions.BusinessException;
import com.cefet.jdsaude_api.exceptions.ResourceNotFoundException;
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
                .orElseThrow(() -> new ResourceNotFoundException("Pessoa não encontrada com o Id: " + id));
        return new PessoaResponseDTO(pessoa);
    }

    @Transactional(readOnly = true)
    public PessoaResponseDTO buscarPorEmail(String email) {
        Pessoa pessoa = pessoaRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("Pessoa não encontrada com o Email: " + email));
        return new PessoaResponseDTO(pessoa);
    }

    @Transactional(readOnly = true)
    public PessoaResponseDTO buscarPorCpf(String cpf) {
        Pessoa pessoa = pessoaRepository.findByCpf(cpf)
                .orElseThrow(() -> new ResourceNotFoundException("Pessoa não encontrada com o CPF: " + cpf));
        return new PessoaResponseDTO(pessoa);
    }

    @Transactional(readOnly = true)
    public List<PessoaResponseDTO> buscarPorNome(String nome) {
        return pessoaRepository.findByNomeContainingIgnoreCase(nome)
                .stream()
                .map(PessoaResponseDTO::new)
                .collect(Collectors.toList());
    }

    //salvar
    @Transactional
    public PessoaResponseDTO salvar(PessoaRequestDTO dto) {
        if (pessoaRepository.existsByCpf(dto.getCpf())) {
            throw new BusinessException("CPF já cadastrado.");
        }
        if (pessoaRepository.existsByEmail(dto.getEmail())) {
            throw new BusinessException("E-mail já cadastrado.");
        }
        Pessoa pessoa = new Pessoa(dto);
        return new PessoaResponseDTO(pessoaRepository.save(pessoa));
    }

    //alterações
    @Transactional
    public PessoaResponseDTO alterar(Long id, PessoaRequestDTO dto) {
        Pessoa pessoa = pessoaRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Pessoa não encontrada com o Id: " + id));

        if (!pessoa.getCpf().equals(dto.getCpf()) && pessoaRepository.existsByCpf(dto.getCpf())) {
            throw new BusinessException("CPF já cadastrado.");
        }

        if (!pessoa.getEmail().equals(dto.getEmail()) && pessoaRepository.existsByEmail(dto.getEmail())) {
            throw new BusinessException("E-mail já cadastrado.");
        }

        pessoa.setNome(dto.getNome());
        pessoa.setCpf(dto.getCpf());
        pessoa.setEmail(dto.getEmail());
        return new PessoaResponseDTO(pessoaRepository.save(pessoa));
    }

    //exclusao
    @Transactional
    public void excluir(Long id) {
        if (!pessoaRepository.existsById(id)) {
            throw new ResourceNotFoundException("Pessoa não encontrada com o Id: " + id);
        }
        pessoaRepository.deleteById(id);
    }

}