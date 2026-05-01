package com.hamburgueria.service;

import com.hamburgueria.entity.Produto;
import com.hamburgueria.repository.ProdutoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ProdutoService {

    private final ProdutoRepository produtoRepository;

    public List<Produto> listar() {
        return produtoRepository.findAll();
    }

    public Produto buscarPorId(Long id) {
        return produtoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Produto não encontrado: " + id));
    }

    public Produto salvar(Produto produto) {
        return produtoRepository.save(produto);
    }

    public Produto atualizar(Long id, Produto dados) {
        Produto existente = buscarPorId(id);
        existente.setNome(dados.getNome());
        existente.setValor(dados.getValor());
        existente.setQuantidadeEstoque(dados.getQuantidadeEstoque());
        return produtoRepository.save(existente);
    }

    public void deletar(Long id) {
        produtoRepository.deleteById(id);
    }
}
