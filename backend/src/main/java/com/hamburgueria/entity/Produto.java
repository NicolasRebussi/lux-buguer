package com.hamburgueria.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "produtos")
@Data
@NoArgsConstructor
public class Produto {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String nome;

    @Column(nullable = false)
    private Double valor;

    @Column(nullable = false)
    private Integer quantidadeEstoque;

    public boolean isDisponivel() {
        return quantidadeEstoque != null && quantidadeEstoque > 0;
    }
}
