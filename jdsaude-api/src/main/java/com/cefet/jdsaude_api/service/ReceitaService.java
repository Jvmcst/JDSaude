package com.cefet.jdsaude_api.service;

import com.cefet.jdsaude_api.dto.ReceitaRequestDTO;
import com.cefet.jdsaude_api.dto.ReceitaResponseDTO;
import com.cefet.jdsaude_api.model.Atendimento;
import com.cefet.jdsaude_api.model.Medicamento;
import com.cefet.jdsaude_api.model.Receita;
import com.cefet.jdsaude_api.repository.AtendimentoRepository;
import com.cefet.jdsaude_api.repository.MedicamentoRepository;
import com.cefet.jdsaude_api.repository.ReceitaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ReceitaService {

    @Autowired
    private ReceitaRepository receitaRepository;
    @Autowired
    private AtendimentoRepository atendimentoRepository;
    @Autowired
    private MedicamentoRepository medicamentoRepository;

    //listagens
    @Transactional(readOnly = true)
    public List<ReceitaResponseDTO> listarTodos() {
        return receitaRepository.findAll()
                .stream()
                .map(ReceitaResponseDTO::new)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public ReceitaResponseDTO buscarPorId(Long id) {
        Receita receita = receitaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Receita não encontrada com o Id: " + id));
        return new ReceitaResponseDTO(receita);
    }

    @Transactional(readOnly = true)
    public List<ReceitaResponseDTO> buscarPorAtendimento(Long idAtendimento) {
        return receitaRepository.findByAtendimentoId(idAtendimento)
                .stream()
                .map(ReceitaResponseDTO::new)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public List<ReceitaResponseDTO> buscarPorMedicamento(Long idMedicamento) {
        return receitaRepository.findByMedicamentoId(idMedicamento)
                .stream()
                .map(ReceitaResponseDTO::new)
                .collect(Collectors.toList());
    }

    //salvar
    @Transactional
    public ReceitaResponseDTO salvar(ReceitaRequestDTO dto) {
        Atendimento atendimento = atendimentoRepository.findById(dto.getIdAtendimento())
                .orElseThrow(() -> new RuntimeException("Atendimento não encontrado com o Id: " + dto.getIdAtendimento()));

        Medicamento medicamento = medicamentoRepository.findById(dto.getIdMedicamento())
                .orElseThrow(() -> new RuntimeException("Medicamento não encontrado com o Id: " + dto.getIdMedicamento()));

        Receita receita = new Receita(dto, atendimento, medicamento);
        return new ReceitaResponseDTO(receitaRepository.save(receita));
    }

    //alteracoes
    @Transactional
    public ReceitaResponseDTO alterar(Long id, ReceitaRequestDTO dto) {
        Receita receita = receitaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Receita não encontrada com o Id: " + id));

        Atendimento atendimento = atendimentoRepository.findById(dto.getIdAtendimento())
                .orElseThrow(() -> new RuntimeException("Atendimento não encontrado com o Id: " + dto.getIdAtendimento()));

        Medicamento medicamento = medicamentoRepository.findById(dto.getIdMedicamento())
                .orElseThrow(() -> new RuntimeException("Medicamento não encontrado com o Id: " + dto.getIdMedicamento()));

        receita.setDescricao(dto.getDescricao());
        receita.setAtendimento(atendimento);
        receita.setMedicamento(medicamento);
        return new ReceitaResponseDTO(receitaRepository.save(receita));
    }

    //excluir
    @Transactional
    public void excluir(Long id) {
        Receita receita = receitaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Receita não encontrada com o Id: " + id));
        receitaRepository.delete(receita);
    }
}