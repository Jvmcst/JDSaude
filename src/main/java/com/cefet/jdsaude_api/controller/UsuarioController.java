package com.cefet.jdsaude_api.controller;

import com.cefet.jdsaude_api.dto.*;
import com.cefet.jdsaude_api.service.UsuarioService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/usuario")
public class UsuarioController {

    @Autowired
    private UsuarioService usuarioService;

    // ── LOGIN ────────────────────────────────────────────────────────────────

    @PostMapping("/login")
    public ResponseEntity<LoginResponseDTO> login(@RequestBody @Valid LoginRequestDTO dto) {
        return ResponseEntity.ok(usuarioService.login(dto));
    }

    // ── LISTAGENS ─────────────────────────────────────────────────────────────

    @GetMapping
    public List<UsuarioResponseDTO> listarTodos() {
        return usuarioService.listarTodos();
    }

    @GetMapping("/{id}")
    public UsuarioResponseDTO buscarPorId(@PathVariable Long id) {
        return usuarioService.buscarPorId(id);
    }

    // ── SALVAR ────────────────────────────────────────────────────────────────

    @PostMapping
    public UsuarioResponseDTO salvar(@RequestBody @Valid UsuarioRequestDTO dto) {
        return usuarioService.salvar(dto);
    }

    // ── ALTERAÇÕES ────────────────────────────────────────────────────────────

    @PutMapping("/{id}")
    public UsuarioResponseDTO alterar(@PathVariable Long id, @RequestBody @Valid UsuarioRequestDTO dto) {
        return usuarioService.alterar(id, dto);
    }

    // ── EXCLUSÃO ──────────────────────────────────────────────────────────────

    @DeleteMapping("/{id}")
    public void excluir(@PathVariable Long id) {
        usuarioService.excluir(id);
    }
}
