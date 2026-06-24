package com.cefet.jdsaude_api.service;

import com.cefet.jdsaude_api.dto.PessoaEspecializacaoRequestDTO;
import com.cefet.jdsaude_api.dto.PessoaEspecializacaoResponseDTO;
import com.cefet.jdsaude_api.model.Especializacao;
import com.cefet.jdsaude_api.model.Pessoa;
import com.cefet.jdsaude_api.model.PessoaEspecializacao;
import com.cefet.jdsaude_api.repository.EspecializacaoRepository;
import com.cefet.jdsaude_api.repository.PessoaEspecializacaoRepository;
import com.cefet.jdsaude_api.repository.PessoaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class PessoaEspecializacaoService {

    @Autowired
    private PessoaEspecializacaoRepository pessoaEspecializacaoRepository;
    @Autowired
    private PessoaRepository pessoaRepository;
    @Autowired
    private EspecializacaoRepository especializacaoRepository;

    //listagens
    @Transactional(readOnly = true)
    public List<PessoaEspecializacaoResponseDTO> listarTodos() {
        return pessoaEspecializacaoRepository.findAll()
                .stream()
                .map(PessoaEspecializacaoResponseDTO::new)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public PessoaEspecializacaoResponseDTO buscarPorId(Long id) {
        PessoaEspecializacao pe = pessoaEspecializacaoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Registro não encontrado com o Id: " + id));
        return new PessoaEspecializacaoResponseDTO(pe);
    }

    @Transactional(readOnly = true)
    public List<PessoaEspecializacaoResponseDTO> buscarPorProfissional(Long idProfissional) {
        return pessoaEspecializacaoRepository.findByPessoaProfissionalId(idProfissional)
                .stream()
                .map(PessoaEspecializacaoResponseDTO::new)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public List<PessoaEspecializacaoResponseDTO> buscarPorEspecializacao(Long idEspecializacao) {
        return pessoaEspecializacaoRepository.findByEspecializacaoId(idEspecializacao)
                .stream()
                .map(PessoaEspecializacaoResponseDTO::new)
                .collect(Collectors.toList());
    }

    //salvar
    @Transactional
    public PessoaEspecializacaoResponseDTO salvar(PessoaEspecializacaoRequestDTO dto) {
        if (pessoaEspecializacaoRepository.existsByPessoaProfissionalIdAndEspecializacaoId(
                dto.getIdPessoaProfissional(), dto.getIdEspecializacao())) {
            throw new RuntimeException("Este profissional já possui esta especialização.");
        }
        Pessoa profissional = pessoaRepository.findById(dto.getIdPessoaProfissional())
                .orElseThrow(() -> new RuntimeException("Profissional não encontrado com o Id: " + dto.getIdPessoaProfissional()));

        Especializacao especializacao = especializacaoRepository.findById(dto.getIdEspecializacao())
                .orElseThrow(() -> new RuntimeException("Especialização não encontrada com o Id: " + dto.getIdEspecializacao()));

        PessoaEspecializacao pe = new PessoaEspecializacao(profissional, especializacao);
        return new PessoaEspecializacaoResponseDTO(pessoaEspecializacaoRepository.save(pe));
    }

    //excluir
    @Transactional
    public void excluir(Long id) {
        PessoaEspecializacao pe = pessoaEspecializacaoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Registro não encontrado com o Id: " + id));
        pessoaEspecializacaoRepository.delete(pe);
    }
}
