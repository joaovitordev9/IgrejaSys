package br.com.igreja.Sys.dto;

import br.com.igreja.Sys.entity.ItemPedido;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
public class ItemPedidoResponse {

    private long Id;
    private Long produtoId;
    private String nomeProduto;
    private long quantidade;
    private String descricao;
    private BigDecimal precoUnitario;

    public static ItemPedidoResponse fromEntity(ItemPedido itemPedido) {
        ItemPedidoResponse response = new ItemPedidoResponse();

        response.setId(itemPedido.getId());
        response.setProdutoId(itemPedido.getProduto().getId());
        response.setQuantidade(itemPedido.getQuantidade());
        response.setNomeProduto(itemPedido.getProduto().getNome());
        response.setDescricao(itemPedido.getProduto().getDescricao());
        response.setPrecoUnitario(itemPedido.getPrecoUnitario());
        return response;
    }

}
