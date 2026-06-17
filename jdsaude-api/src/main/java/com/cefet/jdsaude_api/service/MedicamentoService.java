package com.cefet.jdsaude_api.service;

import com.cefet.jdsaude_api.dto.MedicamentoRequestDTO;
import com.cefet.jdsaude_api.dto.MedicamentoResponseDTO;
import com.cefet.jdsaude_api.model.Medicamento;
import com.cefet.jdsaude_api.repository.MedicamentoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class MedicamentoService {

    @Autowired
    private MedicamentoRepository medicamentoRepository;

    //listagens
    @Transactional(readOnly = true)
    public List<MedicamentoResponseDTO> listarTodos() {
        return medicamentoRepository.findAll()
                .stream()
                .map(MedicamentoResponseDTO::new)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public MedicamentoResponseDTO buscarPorId(Long id) {
        Medicamento medicamento = medicamentoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Medicamento não encontrado com o Id: " + id));
        return new MedicamentoResponseDTO(medicamento);
    }

    @Transactional(readOnly = true)
    public List<MedicamentoResponseDTO> buscarContendoNome(String nome) {
        return medicamentoRepository.findByNomeContainingIgnoreCase(nome)
                .stream()
                .map(MedicamentoResponseDTO::new)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public List<MedicamentoResponseDTO> buscarContendoDescricao(String descricao) {
        return medicamentoRepository.findByDescricaoContainingIgnoreCase(descricao)
                .stream()
                .map(MedicamentoResponseDTO::new)
                .collect(Collectors.toList());
    }

    //salvar
    @Transactional
    public MedicamentoResponseDTO salvar(MedicamentoRequestDTO dto) {
        Medicamento medicamento = new Medicamento(dto);
        return new MedicamentoResponseDTO(medicamentoRepository.save(medicamento));
    }

    //alteracoes
    @Transactional
    public MedicamentoResponseDTO alterar(Long id, MedicamentoRequestDTO dto) {
        Medicamento medicamento = medicamentoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Medicamento não encontrado com o Id: " + id));

        medicamento.setNome(dto.getNome());
        medicamento.setDescricao(dto.getDescricao());
        return new MedicamentoResponseDTO(medicamentoRepository.save(medicamento));
    }

    //excluir
    @Transactional
    public void excluir(Long id) {
        Medicamento medicamento = medicamentoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Medicamento não encontrado com o Id: " + id));

        medicamentoRepository.delete(medicamento);
    }
}