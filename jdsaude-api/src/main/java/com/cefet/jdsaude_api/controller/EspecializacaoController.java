package com.cefet.jdsaude_api.controller;

import com.cefet.jdsaude_api.dto.EspecializacaoRequestDTO;
import com.cefet.jdsaude_api.dto.EspecializacaoResponseDTO;
import com.cefet.jdsaude_api.service.EspecializacaoService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/especializacao")
public class EspecializacaoController {

    @Autowired
    private EspecializacaoService especializacaoService;

    //listagens
    @GetMapping
    public List<EspecializacaoResponseDTO> listarTodos() {
        return especializacaoService.listarTodos();
    }

    @GetMapping("/{id}")
    public EspecializacaoResponseDTO pesquisarPorId(@PathVariable Long id) {
        return especializacaoService.buscarPorId(id);
    }

    @GetMapping("/descricao/{descricao}")
    public List<EspecializacaoResponseDTO> pesquisarPorDescricao(@PathVariable String descricao) {
        return especializacaoService.buscarContendoDescricao(descricao);
    }

    //salvar
    @PostMapping
    public EspecializacaoResponseDTO salvar(@RequestBody @Valid EspecializacaoRequestDTO dto) {
        return especializacaoService.salvar(dto);
    }

    //alterações
    @PutMapping("/{id}")
    public EspecializacaoResponseDTO alterar(@PathVariable Long id, @RequestBody @Valid EspecializacaoRequestDTO dto) {
        return especializacaoService.alterar(id, dto);
    }

    //exclusao
    @DeleteMapping("/{id}")
    public void excluir(@PathVariable Long id) {
        especializacaoService.excluir(id);
    }
}