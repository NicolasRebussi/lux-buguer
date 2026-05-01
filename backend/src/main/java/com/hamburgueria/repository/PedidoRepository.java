package com.hamburgueria.repository;

import com.hamburgueria.entity.Pedido;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDateTime;
import java.util.List;

public interface PedidoRepository extends JpaRepository<Pedido, Long> {
    List<Pedido> findByDataBetween(LocalDateTime inicio, LocalDateTime fim);

    @Query("SELECT COALESCE(SUM(p.valorTotal), 0) FROM Pedido p WHERE p.data BETWEEN :inicio AND :fim")
    Double sumValorTotalByDataBetween(LocalDateTime inicio, LocalDateTime fim);
}
