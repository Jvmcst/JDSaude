package com.cefet.jdsaude_api.service;

import com.cefet.jdsaude_api.dto.TriagemRequestDTO;
import com.cefet.jdsaude_api.dto.TriagemResponseDTO;
import com.cefet.jdsaude_api.model.Atendimento;
import com.cefet.jdsaude_api.model.Pessoa;
import com.cefet.jdsaude_api.model.Triagem;
import com.cefet.jdsaude_api.repository.AtendimentoRepository;
import com.cefet.jdsaude_api.repository.PessoaRepository;
import com.cefet.jdsaude_api.repository.TriagemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class TriagemService {

    @Autowired
    private TriagemRepository triagemRepository;
    @Autowired
    private AtendimentoRepository atendimentoRepository;
    @Autowired
    private PessoaRepository pessoaRepository;

    //listagens
    @Transactional(readOnly = true)
    public List<TriagemResponseDTO> listarTodos() {
        return triagemRepository.findAll()
                .stream()
                .map(TriagemResponseDTO::new)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public TriagemResponseDTO buscarPorId(Long id) {
        Triagem triagem = triagemRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Triagem não encontrada com o Id: " + id));
        return new TriagemResponseDTO(triagem);
    }

    @Transactional(readOnly = true)
    public List<TriagemResponseDTO> buscarPorAtendimento(Long idAtendimento) {
        return triagemRepository.findByAtendimentoId(idAtendimento)
                .stream()
                .map(TriagemResponseDTO::new)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public List<TriagemResponseDTO> buscarPorProfissional(Long idProfissional) {
        return triagemRepository.findByPessoaProfissionalId(idProfissional)
                .stream()
                .map(TriagemResponseDTO::new)
                .collect(Collectors.toList());
    }

    //salvar
    @Transactional
    public TriagemResponseDTO salvar(TriagemRequestDTO dto) {
        Atendimento atendimento = atendimentoRepository.findById(dto.getIdAtendimento())
                .orElseThrow(() -> new RuntimeException("Atendimento não encontrado com o Id: " + dto.getIdAtendimento()));

        Pessoa profissional = pessoaRepository.findById(dto.getIdPessoaProfissional())
                .orElseThrow(() -> new RuntimeException("Profissional não encontrado com o Id: " + dto.getIdPessoaProfissional()));

        Triagem triagem = new Triagem(dto, atendimento, profissional);
        return new TriagemResponseDTO(triagemRepository.save(triagem));
    }

    //alteracoes
    @Transactional
    public TriagemResponseDTO alterar(Long id, TriagemRequestDTO dto) {
        Triagem triagem = triagemRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Triagem não encontrada com o Id: " + id));

        Atendimento atendimento = atendimentoRepository.findById(dto.getIdAtendimento())
                .orElseThrow(() -> new RuntimeException("Atendimento não encontrado com o Id: " + dto.getIdAtendimento()));

        Pessoa profissional = pessoaRepository.findById(dto.getIdPessoaProfissional())
                .orElseThrow(() -> new RuntimeException("Profissional não encontrado com o Id: " + dto.getIdPessoaProfissional()));

        triagem.setDescricao(dto.getDescricao());
        triagem.setAtendimento(atendimento);
        triagem.setPessoaProfissional(profissional);
        return new TriagemResponseDTO(triagemRepository.save(triagem));
    }

    //excluir
    @Transactional
    public void excluir(Long id) {
        Triagem triagem = triagemRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Triagem não encontrada com o Id: " + id));
        triagemRepository.delete(triagem);
    }
}