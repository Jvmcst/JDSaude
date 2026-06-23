package com.cefet.jdsaude_api.service;

import com.cefet.jdsaude_api.dto.EspecializacaoRequestDTO;
import com.cefet.jdsaude_api.dto.EspecializacaoResponseDTO;
import com.cefet.jdsaude_api.model.Especializacao;
import com.cefet.jdsaude_api.repository.EspecializacaoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class EspecializacaoService {

    @Autowired
    private EspecializacaoRepository especializacaoRepository;

    //listagens
    @Transactional(readOnly = true)
    public List<EspecializacaoResponseDTO> listarTodos() {
        return especializacaoRepository.findAll()
                .stream()
                .map(EspecializacaoResponseDTO::new)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public EspecializacaoResponseDTO buscarPorId(Long id) {
        Especializacao especializacao = especializacaoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Especialização não encontrada com o Id: " + id));
        return new EspecializacaoResponseDTO(especializacao);
    }

    @Transactional(readOnly = true)
    public List<EspecializacaoResponseDTO> buscarContendoDescricao(String descricao) {
        return especializacaoRepository.findByDescricaoContainingIgnoreCase(descricao)
                .stream()
                .map(EspecializacaoResponseDTO::new)
                .collect(Collectors.toList());
    }

    //salvar
    @Transactional
    public EspecializacaoResponseDTO salvar(EspecializacaoRequestDTO dto) {
        if (especializacaoRepository.existsByDescricaoIgnoreCase(dto.getDescricao())) {
            throw new RuntimeException("Especialização já cadastrada: " + dto.getDescricao());
        }
        Especializacao especializacao = new Especializacao(dto);
        return new EspecializacaoResponseDTO(especializacaoRepository.save(especializacao));
    }

    //alteracoes
    @Transactional
    public EspecializacaoResponseDTO alterar(Long id, EspecializacaoRequestDTO dto) {
        Especializacao especializacao = especializacaoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Especialização não encontrada com o Id: " + id));

        especializacao.setDescricao(dto.getDescricao());
        return new EspecializacaoResponseDTO(especializacaoRepository.save(especializacao));
    }

    //excluir
    @Transactional
    public void excluir(Long id) {
        Especializacao especializacao = especializacaoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Especialização não encontrada com o Id: " + id));
        especializacaoRepository.delete(especializacao);
    }
}
