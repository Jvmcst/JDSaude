package com.cefet.jdsaude_api.controller;

import com.cefet.jdsaude_api.dto.PessoaEspecializacaoRequestDTO;
import com.cefet.jdsaude_api.dto.PessoaEspecializacaoResponseDTO;
import com.cefet.jdsaude_api.service.PessoaEspecializacaoService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/pessoa-especializacao")
public class PessoaEspecializacaoController {

    @Autowired
    private PessoaEspecializacaoService pessoaEspecializacaoService;

    //listagens
    @GetMapping
    public List<PessoaEspecializacaoResponseDTO> listarTodos() {
        return pessoaEspecializacaoService.listarTodos();
    }

    @GetMapping("/{id}")
    public PessoaEspecializacaoResponseDTO pesquisarPorId(@PathVariable Long id) {
        return pessoaEspecializacaoService.buscarPorId(id);
    }

    @GetMapping("/profissional/{idProfissional}")
    public List<PessoaEspecializacaoResponseDTO> pesquisarPorProfissional(@PathVariable Long idProfissional) {
        return pessoaEspecializacaoService.buscarPorProfissional(idProfissional);
    }

    @GetMapping("/especializacao/{idEspecializacao}")
    public List<PessoaEspecializacaoResponseDTO> pesquisarPorEspecializacao(@PathVariable Long idEspecializacao) {
        return pessoaEspecializacaoService.buscarPorEspecializacao(idEspecializacao);
    }

    //salvar
    @PostMapping
    public PessoaEspecializacaoResponseDTO salvar(@RequestBody @Valid PessoaEspecializacaoRequestDTO dto) {
        return pessoaEspecializacaoService.salvar(dto);
    }

    //exclusao
    @DeleteMapping("/{id}")
    public void excluir(@PathVariable Long id) {
        pessoaEspecializacaoService.excluir(id);
    }
}