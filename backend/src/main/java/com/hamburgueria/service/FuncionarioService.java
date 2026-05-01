package com.hamburgueria.service;

import com.hamburgueria.entity.Funcionario;
import com.hamburgueria.repository.FuncionarioRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class FuncionarioService {

    private final FuncionarioRepository funcionarioRepository;

    public List<Funcionario> listar() {
        return funcionarioRepository.findAll();
    }

    public Funcionario buscarPorId(Long id) {
        return funcionarioRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Funcionário não encontrado: " + id));
    }

    public Funcionario salvar(Funcionario funcionario) {
        return funcionarioRepository.save(funcionario);
    }

    public Funcionario atualizar(Long id, Funcionario dados) {
        Funcionario existente = buscarPorId(id);
        existente.setNome(dados.getNome());
        existente.setFuncao(dados.getFuncao());
        existente.setStatus(dados.getStatus());
        existente.setSalario(dados.getSalario());
        existente.setDiasTrabalhados(dados.getDiasTrabalhados());
        existente.setHorasTrabalhadas(dados.getHorasTrabalhadas());
        return funcionarioRepository.save(existente);
    }

    public void deletar(Long id) {
        funcionarioRepository.deleteById(id);
    }
}
