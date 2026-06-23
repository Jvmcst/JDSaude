package com.cefet.jdsaude_api.service;

import com.cefet.jdsaude_api.dto.DiagnosticoRequestDTO;
import com.cefet.jdsaude_api.dto.DiagnosticoResponseDTO;
import com.cefet.jdsaude_api.model.Atendimento;
import com.cefet.jdsaude_api.model.Diagnostico;
import com.cefet.jdsaude_api.repository.AtendimentoRepository;
import com.cefet.jdsaude_api.repository.DiagnosticoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class DiagnosticoService {

    @Autowired
    private DiagnosticoRepository diagnosticoRepository;
    @Autowired
    private AtendimentoRepository atendimentoRepository;

    //listagens
    @Transactional(readOnly = true)
    public List<DiagnosticoResponseDTO> listarTodos() {
        return diagnosticoRepository.findAll()
                .stream()
                .map(DiagnosticoResponseDTO::new)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public DiagnosticoResponseDTO buscarPorId(Long id) {
        Diagnostico diagnostico = diagnosticoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Diagnóstico não encontrado com o Id: " + id));
        return new DiagnosticoResponseDTO(diagnostico);
    }

    @Transactional(readOnly = true)
    public List<DiagnosticoResponseDTO> buscarPorAtendimento(Long idAtendimento) {
        return diagnosticoRepository.findByAtendimentoId(idAtendimento)
                .stream()
                .map(DiagnosticoResponseDTO::new)
                .collect(Collectors.toList());
    }

    //salvar
    @Transactional
    public DiagnosticoResponseDTO salvar(DiagnosticoRequestDTO dto) {
        Atendimento atendimento = atendimentoRepository.findById(dto.getIdAtendimento())
                .orElseThrow(() -> new RuntimeException("Atendimento não encontrado com o Id: " + dto.getIdAtendimento()));

        Diagnostico diagnostico = new Diagnostico(dto, atendimento);
        return new DiagnosticoResponseDTO(diagnosticoRepository.save(diagnostico));
    }

    //alteracoes
    @Transactional
    public DiagnosticoResponseDTO alterar(Long id, DiagnosticoRequestDTO dto) {
        Diagnostico diagnostico = diagnosticoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Diagnóstico não encontrado com o Id: " + id));

        Atendimento atendimento = atendimentoRepository.findById(dto.getIdAtendimento())
                .orElseThrow(() -> new RuntimeException("Atendimento não encontrado com o Id: " + dto.getIdAtendimento()));

        diagnostico.setDescricao(dto.getDescricao());
        diagnostico.setAtendimento(atendimento);
        return new DiagnosticoResponseDTO(diagnosticoRepository.save(diagnostico));
    }

    //excluir
    @Transactional
    public void excluir(Long id) {
        Diagnostico diagnostico = diagnosticoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Diagnóstico não encontrado com o Id: " + id));
        diagnosticoRepository.delete(diagnostico);
    }
}