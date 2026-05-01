package com.hamburgueria.controller;

import com.hamburgueria.entity.Funcionario;
import com.hamburgueria.service.FuncionarioService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/funcionarios")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class FuncionarioController {

    private final FuncionarioService funcionarioService;

    @GetMapping
    public List<Funcionario> listar() {
        return funcionarioService.listar();
    }

    @GetMapping("/{id}")
    public Funcionario buscar(@PathVariable Long id) {
        return funcionarioService.buscarPorId(id);
    }

    @PostMapping
    public Funcionario criar(@RequestBody Funcionario funcionario) {
        return funcionarioService.salvar(funcionario);
    }

    @PutMapping("/{id}")
    public Funcionario atualizar(@PathVariable Long id, @RequestBody Funcionario funcionario) {
        return funcionarioService.atualizar(id, funcionario);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        funcionarioService.deletar(id);
        return ResponseEntity.noContent().build();
    }
}
