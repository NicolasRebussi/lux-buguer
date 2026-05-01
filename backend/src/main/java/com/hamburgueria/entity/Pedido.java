package com.hamburgueria.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "pedidos")
@Data
@NoArgsConstructor
public class Pedido {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String nomeCliente;

    @Column(nullable = false)
    private String tipoPedido;

    @ManyToMany
    @JoinTable(
        name = "pedido_produtos",
        joinColumns = @JoinColumn(name = "pedido_id"),
        inverseJoinColumns = @JoinColumn(name = "produto_id")
    )
    private List<Produto> produtos = new ArrayList<>();

    private Double valorTotal;

    @Column(nullable = false)
    private LocalDateTime data;

    @Column(nullable = false)
    private String status;

    @ManyToOne
    @JoinColumn(name = "funcionario_id")
    private Funcionario funcionarioResponsavel;
}
