package com.cefet.jdsaude_api.controller;

import com.cefet.jdsaude_api.dto.MedicamentoRequestDTO;
import com.cefet.jdsaude_api.dto.MedicamentoResponseDTO;
import com.cefet.jdsaude_api.service.MedicamentoService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/medicamento")
public class MedicamentoController {

    @Autowired
    private MedicamentoService medicamentoService;

    //listagens
    @GetMapping
    public List<MedicamentoResponseDTO> listarTodos() {
        return medicamentoService.listarTodos();
    }

    @GetMapping("/{id}")
    public MedicamentoResponseDTO pesquisarPorId(@PathVariable Long id) {
        return medicamentoService.buscarPorId(id);
    }

    @GetMapping("/nome/{nome}")
    public List<MedicamentoResponseDTO> pesquisarPorNome(@PathVariable String nome) {
        return medicamentoService.buscarContendoNome(nome);
    }

    @GetMapping("/descricao/{descricao}")
    public List<MedicamentoResponseDTO> pesquisarPorDescricao(@PathVariable String descricao) {
        return medicamentoService.buscarContendoDescricao(descricao);
    }

    //salvar
    @PostMapping
    public MedicamentoResponseDTO salvar(@RequestBody @Valid MedicamentoRequestDTO dto) {
        return medicamentoService.salvar(dto);
    }

    //alterar
    @PutMapping("/{id}")
    public MedicamentoResponseDTO alterar(@PathVariable Long id, @RequestBody @Valid MedicamentoRequestDTO dto) {
        return medicamentoService.alterar(id, dto);
    }

    //excluir
    @DeleteMapping("/{id}")
    public void remover(@PathVariable Long id) {
        medicamentoService.excluir(id);
    }
}