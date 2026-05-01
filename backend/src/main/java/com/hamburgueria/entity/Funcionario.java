package com.hamburgueria.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "funcionarios")
@Data
@NoArgsConstructor
public class Funcionario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String nome;

    @Column(nullable = false)
    private String funcao;

    @Column(nullable = false)
    private String status;

    private Double salario;

    private Integer diasTrabalhados;

    private Double horasTrabalhadas;
}
