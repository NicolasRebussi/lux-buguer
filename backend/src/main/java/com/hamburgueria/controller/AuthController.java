package com.hamburgueria.controller;

import com.hamburgueria.entity.Usuario;
import com.hamburgueria.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class AuthController {

    private final AuthService authService;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> body) {
        String username = body.get("username");
        String password = body.get("password");
        Optional<Usuario> usuario = authService.login(username, password);
        if (usuario.isPresent()) {
            return ResponseEntity.ok(Map.of("sucesso", true, "nome", usuario.get().getNome(), "id", usuario.get().getId()));
        }
        return ResponseEntity.status(401).body(Map.of("sucesso", false, "mensagem", "Usuário ou senha inválidos"));
    }
}
