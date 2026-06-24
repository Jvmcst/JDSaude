package com.cefet.jdsaude_api.service;

import com.cefet.jdsaude_api.dto.EscalaRequestDTO;
import com.cefet.jdsaude_api.dto.EscalaResponseDTO;
import com.cefet.jdsaude_api.model.Escala;
import com.cefet.jdsaude_api.model.Pessoa;
import com.cefet.jdsaude_api.model.enums.DisponibilidadeEscala;
import com.cefet.jdsaude_api.repository.EscalaRepository;
import com.cefet.jdsaude_api.repository.PessoaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class EscalaService {

    @Autowired
    private EscalaRepository escalaRepository;
    @Autowired
    private PessoaRepository pessoaRepository;

    //listagens
    @Transactional(readOnly = true)
    public List<EscalaResponseDTO> listarTodos() {
        return escalaRepository.findAll()
                .stream()
                .map(EscalaResponseDTO::new)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public EscalaResponseDTO buscarPorId(Long id) {
        Escala escala = escalaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Escala não encontrada com o Id: " + id));
        return new EscalaResponseDTO(escala);
    }

    @Transactional(readOnly = true)
    public List<EscalaResponseDTO> buscarPorProfissional(Long idProfissional) {
        return escalaRepository.findByPessoaProfissionalId(idProfissional)
                .stream()
                .map(EscalaResponseDTO::new)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public List<EscalaResponseDTO> buscarPorData(LocalDate data) {
        return escalaRepository.findByData(data)
                .stream()
                .map(EscalaResponseDTO::new)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public List<EscalaResponseDTO> buscarPorPeriodo(LocalDate inicio, LocalDate fim) {
        return escalaRepository.findByDataBetween(inicio, fim)
                .stream()
                .map(EscalaResponseDTO::new)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public List<EscalaResponseDTO> buscarPorDisponibilidade(DisponibilidadeEscala disponibilidade) {
        return escalaRepository.findByDisponibilidade(disponibilidade)
                .stream()
                .map(EscalaResponseDTO::new)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public List<EscalaResponseDTO> buscarPorProfissionalEPeriodo(Long idProfissional, LocalDate inicio, LocalDate fim) {
        return escalaRepository.findByPessoaProfissionalIdAndDataBetween(idProfissional, inicio, fim)
                .stream()
                .map(EscalaResponseDTO::new)
                .collect(Collectors.toList());
    }

    //salvar
    @Transactional
    public EscalaResponseDTO salvar(EscalaRequestDTO dto) {
        Pessoa profissional = pessoaRepository.findById(dto.getIdPessoaProfissional())
                .orElseThrow(() -> new RuntimeException("Profissional não encontrado com o Id: " + dto.getIdPessoaProfissional()));

        Escala escala = new Escala(dto, profissional);
        return new EscalaResponseDTO(escalaRepository.save(escala));
    }

    //alteracoes
    @Transactional
    public EscalaResponseDTO alterar(Long id, EscalaRequestDTO dto) {
        Escala escala = escalaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Escala não encontrada com o Id: " + id));

        Pessoa profissional = pessoaRepository.findById(dto.getIdPessoaProfissional())
                .orElseThrow(() -> new RuntimeException("Profissional não encontrado com o Id: " + dto.getIdPessoaProfissional()));

        escala.setData(dto.getData());
        escala.setHorario(dto.getHorario());
        escala.setDisponibilidade(dto.getDisponibilidade());
        escala.setPessoaProfissional(profissional);
        return new EscalaResponseDTO(escalaRepository.save(escala));
    }

    //excluir
    @Transactional
    public void excluir(Long id) {
        Escala escala = escalaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Escala não encontrada com o Id: " + id));
        escalaRepository.delete(escala);
    }
}
