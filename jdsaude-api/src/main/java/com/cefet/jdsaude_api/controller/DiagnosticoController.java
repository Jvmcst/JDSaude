package com.cefet.jdsaude_api.controller;

import com.cefet.jdsaude_api.dto.DiagnosticoRequestDTO;
import com.cefet.jdsaude_api.dto.DiagnosticoResponseDTO;
import com.cefet.jdsaude_api.service.DiagnosticoService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/diagnostico")
public class DiagnosticoController {

    @Autowired
    private DiagnosticoService diagnosticoService;

    //listagens
    @GetMapping
    public List<DiagnosticoResponseDTO> listarTodos() {
        return diagnosticoService.listarTodos();
    }

    @GetMapping("/{id}")
    public DiagnosticoResponseDTO pesquisarPorId(@PathVariable Long id) {
        return diagnosticoService.buscarPorId(id);
    }

    @GetMapping("/atendimento/{idAtendimento}")
    public List<DiagnosticoResponseDTO> pesquisarPorAtendimento(@PathVariable Long idAtendimento) {
        return diagnosticoService.buscarPorAtendimento(idAtendimento);
    }

    //salvar
    @PostMapping
    public DiagnosticoResponseDTO salvar(@RequestBody @Valid DiagnosticoRequestDTO dto) {
        return diagnosticoService.salvar(dto);
    }

    //alterações
    @PutMapping("/{id}")
    public DiagnosticoResponseDTO alterar(@PathVariable Long id, @RequestBody @Valid DiagnosticoRequestDTO dto) {
        return diagnosticoService.alterar(id, dto);
    }

    //exclusao
    @DeleteMapping("/{id}")
    public void excluir(@PathVariable Long id) {
        diagnosticoService.excluir(id);
    }
}