package com.cefet.jdsaude_api.controller;

import com.cefet.jdsaude_api.dto.ReceitaRequestDTO;
import com.cefet.jdsaude_api.dto.ReceitaResponseDTO;
import com.cefet.jdsaude_api.service.ReceitaService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/receita")
public class ReceitaController {

    @Autowired
    private ReceitaService receitaService;

    //listagens
    @GetMapping
    public List<ReceitaResponseDTO> listarTodos() {
        return receitaService.listarTodos();
    }

    @GetMapping("/{id}")
    public ReceitaResponseDTO pesquisarPorId(@PathVariable Long id) {
        return receitaService.buscarPorId(id);
    }

    @GetMapping("/atendimento/{idAtendimento}")
    public List<ReceitaResponseDTO> pesquisarPorAtendimento(@PathVariable Long idAtendimento) {
        return receitaService.buscarPorAtendimento(idAtendimento);
    }

    @GetMapping("/medicamento/{idMedicamento}")
    public List<ReceitaResponseDTO> pesquisarPorMedicamento(@PathVariable Long idMedicamento) {
        return receitaService.buscarPorMedicamento(idMedicamento);
    }

    //salvar
    @PostMapping
    public ReceitaResponseDTO salvar(@RequestBody @Valid ReceitaRequestDTO dto) {
        return receitaService.salvar(dto);
    }

    //alterações
    @PutMapping("/{id}")
    public ReceitaResponseDTO alterar(@PathVariable Long id, @RequestBody @Valid ReceitaRequestDTO dto) {
        return receitaService.alterar(id, dto);
    }

    //exclusao
    @DeleteMapping("/{id}")
    public void excluir(@PathVariable Long id) {
        receitaService.excluir(id);
    }
}