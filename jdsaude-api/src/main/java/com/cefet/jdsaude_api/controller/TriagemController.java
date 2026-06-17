package com.cefet.jdsaude_api.controller;

import com.cefet.jdsaude_api.dto.TriagemRequestDTO;
import com.cefet.jdsaude_api.dto.TriagemResponseDTO;
import com.cefet.jdsaude_api.service.TriagemService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/triagem")
public class TriagemController {

    @Autowired
    private TriagemService triagemService;

    //listagens
    @GetMapping
    public List<TriagemResponseDTO> listarTodos() {
        return triagemService.listarTodos();
    }

    @GetMapping("/{id}")
    public TriagemResponseDTO pesquisarPorId(@PathVariable Long id) {
        return triagemService.buscarPorId(id);
    }

    @GetMapping("/atendimento/{idAtendimento}")
    public List<TriagemResponseDTO> pesquisarPorAtendimento(@PathVariable Long idAtendimento) {
        return triagemService.buscarPorAtendimento(idAtendimento);
    }

    @GetMapping("/profissional/{idProfissional}")
    public List<TriagemResponseDTO> pesquisarPorProfissional(@PathVariable Long idProfissional) {
        return triagemService.buscarPorProfissional(idProfissional);
    }

    //salvar
    @PostMapping
    public TriagemResponseDTO salvar(@RequestBody @Valid TriagemRequestDTO dto) {
        return triagemService.salvar(dto);
    }

    //alterações
    @PutMapping("/{id}")
    public TriagemResponseDTO alterar(@PathVariable Long id, @RequestBody @Valid TriagemRequestDTO dto) {
        return triagemService.alterar(id, dto);
    }

    //exclusao
    @DeleteMapping("/{id}")
    public void excluir(@PathVariable Long id) {
        triagemService.excluir(id);
    }
}