package com.hamburgueria.config;

import com.hamburgueria.entity.Funcionario;
import com.hamburgueria.entity.Produto;
import com.hamburgueria.entity.Usuario;
import com.hamburgueria.repository.FuncionarioRepository;
import com.hamburgueria.repository.ProdutoRepository;
import com.hamburgueria.repository.UsuarioRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class DataSeeder implements CommandLineRunner {

    private final UsuarioRepository usuarioRepository;
    private final FuncionarioRepository funcionarioRepository;
    private final ProdutoRepository produtoRepository;

    @Override
    public void run(String... args) {
        // Usuário admin
        Usuario admin = new Usuario();
        admin.setUsername("admin");
        admin.setPassword("admin123");
        admin.setNome("Administrador");
        usuarioRepository.save(admin);

        // Funcionários
        Funcionario f1 = new Funcionario();
        f1.setNome("João Silva");
        f1.setFuncao("Cozinheiro");
        f1.setStatus("ativo");
        f1.setSalario(2000.0);
        f1.setDiasTrabalhados(0);
        f1.setHorasTrabalhadas(0.0);
        funcionarioRepository.save(f1);

        Funcionario f2 = new Funcionario();
        f2.setNome("Maria Souza");
        f2.setFuncao("Atendente");
        f2.setStatus("ativo");
        f2.setSalario(1800.0);
        f2.setDiasTrabalhados(0);
        f2.setHorasTrabalhadas(0.0);
        funcionarioRepository.save(f2);

        // Produtos
        Produto p1 = new Produto();
        p1.setNome("X-Burguer");
        p1.setValor(18.0);
        p1.setQuantidadeEstoque(50);
        produtoRepository.save(p1);

        Produto p2 = new Produto();
        p2.setNome("X-Bacon");
        p2.setValor(22.0);
        p2.setQuantidadeEstoque(30);
        produtoRepository.save(p2);

        Produto p3 = new Produto();
        p3.setNome("Batata Frita");
        p3.setValor(10.0);
        p3.setQuantidadeEstoque(100);
        produtoRepository.save(p3);

        Produto p4 = new Produto();
        p4.setNome("Refrigerante");
        p4.setValor(7.0);
        p4.setQuantidadeEstoque(80);
        produtoRepository.save(p4);
    }
}
