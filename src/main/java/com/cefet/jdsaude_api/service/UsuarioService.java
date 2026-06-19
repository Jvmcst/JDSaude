package com.cefet.jdsaude_api.service;

import com.cefet.jdsaude_api.dto.*;
import com.cefet.jdsaude_api.model.Pessoa;
import com.cefet.jdsaude_api.model.Usuario;
import com.cefet.jdsaude_api.repository.PessoaRepository;
import com.cefet.jdsaude_api.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class UsuarioService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private PessoaRepository pessoaRepository;

    // ── LOGIN ────────────────────────────────────────────────────────────────

    @Transactional(readOnly = true)
    public LoginResponseDTO login(LoginRequestDTO dto) {
        Usuario usuario = usuarioRepository.findByLogin(dto.getLogin())
                .orElseThrow(() -> new RuntimeException("Login ou senha inválidos."));

        if (!usuario.getSenha().equals(dto.getSenha())) {
            throw new RuntimeException("Login ou senha inválidos.");
        }

        return new LoginResponseDTO(
                usuario.getId(),
                usuario.getLogin(),
                usuario.getPerfil(),
                usuario.getPessoa().getId(),
                usuario.getPessoa().getNome()
        );
    }

    // ── LISTAGENS ─────────────────────────────────────────────────────────────

    @Transactional(readOnly = true)
    public List<UsuarioResponseDTO> listarTodos() {
        return usuarioRepository.findAll()
                .stream()
                .map(UsuarioResponseDTO::new)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public UsuarioResponseDTO buscarPorId(Long id) {
        Usuario usuario = usuarioRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado com o Id: " + id));
        return new UsuarioResponseDTO(usuario);
    }

    // ── SALVAR ────────────────────────────────────────────────────────────────

    @Transactional
    public UsuarioResponseDTO salvar(UsuarioRequestDTO dto) {
        if (usuarioRepository.existsByLogin(dto.getLogin())) {
            throw new RuntimeException("Login '" + dto.getLogin() + "' já está em uso.");
        }

        Pessoa pessoa = pessoaRepository.findById(dto.getPessoaId())
                .orElseThrow(() -> new RuntimeException("Pessoa não encontrada com o Id: " + dto.getPessoaId()));

        Usuario usuario = new Usuario(dto, pessoa);
        return new UsuarioResponseDTO(usuarioRepository.save(usuario));
    }

    // ── ALTERAÇÕES ────────────────────────────────────────────────────────────

    @Transactional
    public UsuarioResponseDTO alterar(Long id, UsuarioRequestDTO dto) {
        Usuario usuario = usuarioRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado com o Id: " + id));

        if (!usuario.getLogin().equals(dto.getLogin()) && usuarioRepository.existsByLogin(dto.getLogin())) {
            throw new RuntimeException("Login '" + dto.getLogin() + "' já está em uso.");
        }

        Pessoa pessoa = pessoaRepository.findById(dto.getPessoaId())
                .orElseThrow(() -> new RuntimeException("Pessoa não encontrada com o Id: " + dto.getPessoaId()));

        usuario.setLogin(dto.getLogin());
        usuario.setSenha(dto.getSenha());
        usuario.setPerfil(dto.getPerfil());
        usuario.setPessoa(pessoa);

        return new UsuarioResponseDTO(usuarioRepository.save(usuario));
    }

    // ── EXCLUSÃO ──────────────────────────────────────────────────────────────

    @Transactional
    public void excluir(Long id) {
        Usuario usuario = usuarioRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado com o Id: " + id));
        usuarioRepository.delete(usuario);
    }
}
