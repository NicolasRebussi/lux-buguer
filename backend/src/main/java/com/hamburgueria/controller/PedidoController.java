package com.hamburgueria.controller;

import com.hamburgueria.entity.Pedido;
import com.hamburgueria.service.PedidoService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/pedidos")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class PedidoController {

    private final PedidoService pedidoService;

    @GetMapping
    public List<Pedido> listar() {
        return pedidoService.listar();
    }

    @GetMapping("/{id}")
    public Pedido buscar(@PathVariable Long id) {
        return pedidoService.buscarPorId(id);
    }

    @PostMapping
    public Pedido criar(@RequestBody Pedido pedido) {
        return pedidoService.criar(pedido);
    }

    @PatchMapping("/{id}/status")
    public Pedido atualizarStatus(@PathVariable Long id, @RequestBody Map<String, String> body) {
        return pedidoService.atualizarStatus(id, body.get("status"));
    }

    @GetMapping("/dashboard")
    public ResponseEntity<Map<String, Object>> dashboard() {
        return ResponseEntity.ok(Map.of(
                "pedidosHoje", pedidoService.contarPedidosHoje(),
                "totalVendidoHoje", pedidoService.totalVendidoHoje()
        ));
    }
}
