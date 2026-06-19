package com.cefet.jdsaude_api.controller;

import com.cefet.jdsaude_api.dto.PessoaRequestDTO;
import com.cefet.jdsaude_api.dto.PessoaResponseDTO;
import com.cefet.jdsaude_api.service.PessoaService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/pessoa")
public class PessoaController {

    @Autowired
    private PessoaService pessoaService;

    //listagens
    @GetMapping
    public List<PessoaResponseDTO> listarTodos() {
        return pessoaService.listarTodos();
    }

    @GetMapping("/{id}")
    public PessoaResponseDTO pesquisarPorId(@PathVariable Long id) {
        return pessoaService.buscarPorId(id);
    }

    @GetMapping("/cpf/{cpf}")
    public PessoaResponseDTO pesquisarPorCpf(@PathVariable String cpf) {
        return pessoaService.buscarPorCpf(cpf);
    }

    @GetMapping("/email/{email}")
    public PessoaResponseDTO pesquisarPorEmail(@PathVariable String email) {
        return pessoaService.buscarPorEmail(email);
    }

    @GetMapping("/nome/{nome}")
    public PessoaResponseDTO pesquisarPorNome(@PathVariable String nome) {
        return pessoaService.buscarPorNome(nome);
    }

    //salvar
    @PostMapping
    public PessoaResponseDTO salvar(@RequestBody @Valid PessoaRequestDTO dto) {
        return pessoaService.salvar(dto);
    }

    //alterações
    @PutMapping("/{id}")
    public PessoaResponseDTO alterar(@PathVariable Long id, @RequestBody @Valid PessoaRequestDTO dto) {
        return pessoaService.alterar(id, dto);
    }

    //exclusao
    @DeleteMapping("/{id}")
    public void excluir(@PathVariable Long id) {
        pessoaService.excluir(id);
    }
}