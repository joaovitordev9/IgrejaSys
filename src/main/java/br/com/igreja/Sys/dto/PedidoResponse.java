package br.com.igreja.Sys.dto;

import br.com.igreja.Sys.entity.ItemPedido;
import br.com.igreja.Sys.entity.Pedido;
import lombok.Getter;
import lombok.Setter;


import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;


@Getter
@Setter
public class PedidoResponse {

    private long id;
    private List<ItemPedidoResponse> itens;
    private BigDecimal valorTotal;
    private LocalDateTime dataCriacao;

    public static PedidoResponse fromEntity(Pedido pedido) {

        PedidoResponse response = new PedidoResponse();

        response.setId(pedido.getId());
        response.setValorTotal(pedido.getValorTotal());
        response.setDataCriacao(pedido.getDataCriacao());
        response.setItens(pedido.getItens().stream()
                .map(ItemPedidoResponse::fromEntity)
                .toList());

        return response;
    }

}
