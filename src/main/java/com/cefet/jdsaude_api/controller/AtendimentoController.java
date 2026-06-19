package com.cefet.jdsaude_api.controller;

import com.cefet.jdsaude_api.dto.AtendimentoRequestDTO;
import com.cefet.jdsaude_api.dto.AtendimentoResponseDTO;
import com.cefet.jdsaude_api.service.AtendimentoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/atendimento")
public class AtendimentoController {

    @Autowired
    private AtendimentoService atendimentoService;

    // GET
    @GetMapping
    public ResponseEntity<List<AtendimentoResponseDTO>> listarTodos() {
        return ResponseEntity.ok(atendimentoService.listarTodos());
    }

    // GET
    @GetMapping("/{id}")
    public ResponseEntity<AtendimentoResponseDTO> buscarPorId(@PathVariable Long id) {
        return ResponseEntity.ok(atendimentoService.buscarPorId(id));
    }

    // GET /atendimento/paciente/{id}
    @GetMapping("/paciente/{id}")
    public ResponseEntity<List<AtendimentoResponseDTO>> buscarPorPaciente(@PathVariable Long id) {
        return ResponseEntity.ok(atendimentoService.buscarPorPaciente(id));
    }

    // GET /atendimento/profissional/{id}
    @GetMapping("/profissional/{id}")
    public ResponseEntity<List<AtendimentoResponseDTO>> buscarPorProfissional(@PathVariable Long id) {
        return ResponseEntity.ok(atendimentoService.buscarPorProfissional(id));
    }

    // GET
    @GetMapping("/realizadas")
    public ResponseEntity<List<AtendimentoResponseDTO>> buscarPorRealizadas(
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate data) {
        return ResponseEntity.ok(atendimentoService.buscarPorRealizadas(data));
    }

    // POST
    @PostMapping
    public ResponseEntity<AtendimentoResponseDTO> salvar(@RequestBody AtendimentoRequestDTO dto) {
        return ResponseEntity.status(201).body(atendimentoService.salvar(dto));
    }

    // PUT
    @PutMapping("/{id}")
    public ResponseEntity<AtendimentoResponseDTO> alterar(
            @PathVariable Long id,
            @RequestBody AtendimentoRequestDTO dto) {
        return ResponseEntity.ok(atendimentoService.alterar(id, dto));
    }

    // DELETE
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> excluir(@PathVariable Long id) {
        atendimentoService.excluir(id);
        return ResponseEntity.noContent().build();
    }
}