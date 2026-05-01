package com.hamburgueria.repository;

import com.hamburgueria.entity.Ponto;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.Optional;

public interface PontoRepository extends JpaRepository<Ponto, Long> {
    Optional<Ponto> findByFuncionarioIdAndData(Long funcionarioId, LocalDate data);
}
