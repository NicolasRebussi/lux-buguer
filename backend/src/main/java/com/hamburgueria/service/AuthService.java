package com.hamburgueria.service;

import com.hamburgueria.entity.Usuario;
import com.hamburgueria.repository.UsuarioRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UsuarioRepository usuarioRepository;

    public Optional<Usuario> login(String username, String password) {
        return usuarioRepository.findByUsernameAndPassword(username, password);
    }
}
