package com.cefet.jdsaude_api.controller;

import com.cefet.jdsaude_api.dto.EscalaRequestDTO;
import com.cefet.jdsaude_api.dto.EscalaResponseDTO;
import com.cefet.jdsaude_api.model.enums.DisponibilidadeEscala;
import com.cefet.jdsaude_api.service.EscalaService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/escala")
public class EscalaController {

    @Autowired
    private EscalaService escalaService;

    //listagens
    @GetMapping
    public List<EscalaResponseDTO> listarTodos() {
        return escalaService.listarTodos();
    }

    @GetMapping("/{id}")
    public EscalaResponseDTO pesquisarPorId(@PathVariable Long id) {
        return escalaService.buscarPorId(id);
    }

    @GetMapping("/profissional/{idProfissional}")
    public List<EscalaResponseDTO> pesquisarPorProfissional(@PathVariable Long idProfissional) {
        return escalaService.buscarPorProfissional(idProfissional);
    }

    @GetMapping("/data/{data}")
    public List<EscalaResponseDTO> buscarPorData(
            @PathVariable @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate data) {
        return escalaService.buscarPorData(data);
    }

    @GetMapping("/periodo")
    public List<EscalaResponseDTO> buscarPorPeriodo(
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate inicio,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate fim) {
        return escalaService.buscarPorPeriodo(inicio, fim);
    }

    @GetMapping("/disponibilidade/{disponibilidade}")
    public List<EscalaResponseDTO> buscarPorDisponibilidade(
            @PathVariable DisponibilidadeEscala disponibilidade) {
        return escalaService.buscarPorDisponibilidade(disponibilidade);
    }

    @GetMapping("/profissional/{id}/periodo")
    public List<EscalaResponseDTO> buscarPorProfissionalEPeriodo(
            @PathVariable Long id,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate inicio,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate fim) {
        return escalaService.buscarPorProfissionalEPeriodo(id, inicio, fim);
    }

    //salvar
    @PostMapping
    public EscalaResponseDTO salvar(@RequestBody @Valid EscalaRequestDTO dto) {
        return escalaService.salvar(dto);
    }

    //alterações
    @PutMapping("/{id}")
    public EscalaResponseDTO alterar(@PathVariable Long id, @RequestBody @Valid EscalaRequestDTO dto) {
        return escalaService.alterar(id, dto);
    }

    //exclusao
    @DeleteMapping("/{id}")
    public void excluir(@PathVariable Long id) {
        escalaService.excluir(id);
    }
}
