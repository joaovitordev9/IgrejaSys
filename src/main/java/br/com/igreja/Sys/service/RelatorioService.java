package br.com.igreja.Sys.service;

import java.math.BigDecimal;
import java.util.List;

import org.springframework.stereotype.Service;

import br.com.igreja.Sys.dto.RelatorioQuantidadeProdutoVendidoResponse;
import br.com.igreja.Sys.dto.RelatorioVendasPorDiaResponse;
import br.com.igreja.Sys.entity.ItemPedido;
import br.com.igreja.Sys.entity.Pedido;
import br.com.igreja.Sys.repository.ItemPedidoRepository;
import br.com.igreja.Sys.repository.PedidoRepository;

@Service 
public class RelatorioService {
    private final PedidoRepository pedidoRepository;
    private final ItemPedidoRepository itemPedidoRepository;

    public RelatorioService(PedidoRepository pedidoRepository, ItemPedidoRepository itemPedidoRepository) {
        this.pedidoRepository = pedidoRepository;
        this.itemPedidoRepository = itemPedidoRepository;
    }

    public List<RelatorioVendasPorDiaResponse> buscarVendasPorDia(long festaId) {

        return pedidoRepository.buscarVendasPorDia(festaId);
    }

    public List<RelatorioQuantidadeProdutoVendidoResponse> buscarQuantidadeProdutosVendidos(Long idFesta) {
        
        return itemPedidoRepository.buscarQuantidadeProdutosVendidos(idFesta);
    }

}
