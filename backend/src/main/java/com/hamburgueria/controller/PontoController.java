package com.hamburgueria.controller;

import com.hamburgueria.entity.Ponto;
import com.hamburgueria.service.PontoService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/pontos")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class PontoController {

    private final PontoService pontoService;

    @GetMapping
    public List<Ponto> listar() {
        return pontoService.listar();
    }

    @PostMapping("/entrada/{funcionarioId}")
    public ResponseEntity<?> entrada(@PathVariable Long funcionarioId) {
        try {
            Ponto ponto = pontoService.baterEntrada(funcionarioId);
            return ResponseEntity.ok(ponto);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/saida/{funcionarioId}")
    public ResponseEntity<?> saida(@PathVariable Long funcionarioId) {
        try {
            Ponto ponto = pontoService.baterSaida(funcionarioId);
            return ResponseEntity.ok(ponto);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
