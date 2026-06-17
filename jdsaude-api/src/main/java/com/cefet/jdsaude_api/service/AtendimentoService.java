package com.cefet.jdsaude_api.service;


import com.cefet.jdsaude_api.dto.AtendimentoResponseDTO;
import com.cefet.jdsaude_api.dto.AtendimentoRequestDTO;
import com.cefet.jdsaude_api.dto.PessoaRequestDTO;
import com.cefet.jdsaude_api.dto.PessoaResponseDTO;
import com.cefet.jdsaude_api.model.Atendimento;
import com.cefet.jdsaude_api.model.Pessoa;
import com.cefet.jdsaude_api.repository.AtendimentoRepository;
import com.cefet.jdsaude_api.repository.PessoaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class AtendimentoService {
    @Autowired
    private AtendimentoRepository atendimentoRepository;
    @Autowired
    private PessoaRepository pessoaRepository;

    //listagens
    @Transactional(readOnly = true)
    public List<AtendimentoResponseDTO> listarTodos() {
        return atendimentoRepository.findAll()
                .stream()
                .map(AtendimentoResponseDTO::new)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public AtendimentoResponseDTO buscarPorId(Long id) {
        Atendimento atendimento = atendimentoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Atendimento não encontrado com o Id: " + id));
        return new AtendimentoResponseDTO(atendimento);
    }

    @Transactional(readOnly = true)
    public List<AtendimentoResponseDTO> buscarPorPaciente(Long id) {
        return atendimentoRepository.findByPessoaPacienteId(id)
                .stream()
                .map(AtendimentoResponseDTO::new)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public List<AtendimentoResponseDTO> buscarPorProfissional(Long id) {
        return atendimentoRepository.findByPessoaProfissionalId(id)
                .stream()
                .map(AtendimentoResponseDTO::new)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public List<AtendimentoResponseDTO> buscarPorRealizadas(LocalDate data) {
        return atendimentoRepository.findByDataRealizacaoAfter(data)
                .stream()
                .map(AtendimentoResponseDTO::new)
                .collect(Collectors.toList());
    }

    //salvar
    @Transactional
    public AtendimentoResponseDTO salvar(AtendimentoRequestDTO dto) {
        Atendimento atendimento = new Atendimento(dto,pessoaRepository.getById(dto.getIdPessoaPaciente()), pessoaRepository.getById(dto.getIdPessoaProfissional()) );
        return new AtendimentoResponseDTO(atendimentoRepository.save(atendimento));
    }

    //alterações
    @Transactional
    public AtendimentoResponseDTO alterar(Long id, AtendimentoRequestDTO dto) {
        Atendimento atendimento = atendimentoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Atendimento não encontrado com o Id: " + id));


        atendimento.setDataRealizacao(dto.getDataRealizacao());
        atendimento.setSituacao(dto.getSituacao());
        atendimento.setPessoaProfissional(pessoaRepository.getById(dto.getIdPessoaProfissional()));
        atendimento.setPessoaPaciente(pessoaRepository.getById(dto.getIdPessoaPaciente()));
        atendimento.setDataRegistro(atendimento.getDataRegistro());
        return new AtendimentoResponseDTO(atendimentoRepository.save(atendimento));
    }

    //exclusao
    @Transactional
    public void excluir(Long id) {
        Atendimento atendimento = atendimentoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Atendimento não encontrado com o Id: " + id));
        atendimentoRepository.delete(atendimento);
    }
}
