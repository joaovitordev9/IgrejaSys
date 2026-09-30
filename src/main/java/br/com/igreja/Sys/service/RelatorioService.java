package br.com.igreja.Sys.service;

import java.math.BigDecimal;
import java.util.List;

import org.springframework.stereotype.Service;

import br.com.igreja.Sys.dto.RelatorioVendasPorDiaResponse;
import br.com.igreja.Sys.entity.Pedido;
import br.com.igreja.Sys.repository.PedidoRepository;

@Service 
public class RelatorioService {
    private final PedidoRepository pedidoRepository;

    public RelatorioService(PedidoRepository pedidoRepository) {
        this.pedidoRepository = pedidoRepository;
    }

    public List<RelatorioVendasPorDiaResponse> buscarVendasPorDia(long festaId) {

        return pedidoRepository.buscarVendasPorDia(festaId);
    }

}
