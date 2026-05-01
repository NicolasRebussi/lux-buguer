package com.hamburgueria.service;

import com.hamburgueria.entity.Funcionario;
import com.hamburgueria.entity.Ponto;
import com.hamburgueria.repository.PontoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class PontoService {

    private final PontoRepository pontoRepository;
    private final FuncionarioService funcionarioService;

    public List<Ponto> listar() {
        return pontoRepository.findAll();
    }

    public Ponto baterEntrada(Long funcionarioId) {
        Funcionario funcionario = funcionarioService.buscarPorId(funcionarioId);
        LocalDate hoje = LocalDate.now();

        Optional<Ponto> pontoExistente = pontoRepository.findByFuncionarioIdAndData(funcionarioId, hoje);
        if (pontoExistente.isPresent()) {
            throw new RuntimeException("Entrada já registrada hoje para este funcionário.");
        }

        Ponto ponto = new Ponto();
        ponto.setFuncionario(funcionario);
        ponto.setData(hoje);
        ponto.setEntrada(LocalTime.now());
        return pontoRepository.save(ponto);
    }

    public Ponto baterSaida(Long funcionarioId) {
        LocalDate hoje = LocalDate.now();
        Ponto ponto = pontoRepository.findByFuncionarioIdAndData(funcionarioId, hoje)
                .orElseThrow(() -> new RuntimeException("Entrada não registrada hoje para este funcionário."));

        if (ponto.getSaida() != null) {
            throw new RuntimeException("Saída já registrada hoje para este funcionário.");
        }

        ponto.setSaida(LocalTime.now());
        double horas = Duration.between(ponto.getEntrada(), ponto.getSaida()).toMinutes() / 60.0;
        ponto.setHorasTrabalhadas(horas);
        return pontoRepository.save(ponto);
    }

    public Optional<Ponto> buscarPorFuncionarioEData(Long funcionarioId, LocalDate data) {
        return pontoRepository.findByFuncionarioIdAndData(funcionarioId, data);
    }
}
