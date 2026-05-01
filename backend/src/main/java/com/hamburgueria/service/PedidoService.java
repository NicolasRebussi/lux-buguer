package com.hamburgueria.service;

import com.hamburgueria.entity.Funcionario;
import com.hamburgueria.entity.Pedido;
import com.hamburgueria.entity.Produto;
import com.hamburgueria.repository.PedidoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class PedidoService {

    private final PedidoRepository pedidoRepository;
    private final ProdutoService produtoService;
    private final FuncionarioService funcionarioService;

    public List<Pedido> listar() {
        return pedidoRepository.findAll();
    }

    public Pedido buscarPorId(Long id) {
        return pedidoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Pedido não encontrado: " + id));
    }

    public Pedido criar(Pedido pedido) {
        pedido.setData(LocalDateTime.now());
        pedido.setStatus("RECEBIDO");

        List<Produto> produtos = pedido.getProdutos().stream()
                .map(p -> produtoService.buscarPorId(p.getId()))
                .toList();
        pedido.setProdutos(produtos);

        double total = produtos.stream().mapToDouble(Produto::getValor).sum();
        pedido.setValorTotal(total);

        if (pedido.getFuncionarioResponsavel() != null && pedido.getFuncionarioResponsavel().getId() != null) {
            Funcionario func = funcionarioService.buscarPorId(pedido.getFuncionarioResponsavel().getId());
            pedido.setFuncionarioResponsavel(func);
        }

        return pedidoRepository.save(pedido);
    }

    public Pedido atualizarStatus(Long id, String novoStatus) {
        Pedido pedido = buscarPorId(id);
        pedido.setStatus(novoStatus);
        return pedidoRepository.save(pedido);
    }

    public long contarPedidosHoje() {
        LocalDateTime inicio = LocalDate.now().atStartOfDay();
        LocalDateTime fim = inicio.plusDays(1);
        return pedidoRepository.findByDataBetween(inicio, fim).size();
    }

    public double totalVendidoHoje() {
        LocalDateTime inicio = LocalDate.now().atStartOfDay();
        LocalDateTime fim = inicio.plusDays(1);
        Double total = pedidoRepository.sumValorTotalByDataBetween(inicio, fim);
        return total != null ? total : 0.0;
    }
}
