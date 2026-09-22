package br.com.igreja.Sys.dto;

import java.time.LocalDate;
import java.util.List;

import br.com.igreja.Sys.entity.Festa;
import lombok.Getter;
import lombok.Setter;

@Getter 
@Setter
public class FestaResponse {
    private long id;
    private String nome;
    private LocalDate dataInicio;
    private LocalDate dataFim;
    private List<ProdutoResponse> produtos;
    private List<PedidoResponse> pedidos;

    public static FestaResponse fromEntity(Festa pedido) {
        FestaResponse response = new FestaResponse();

        response.setId(pedido.getId());
        response.setNome(pedido.getNome());
        response.setDataInicio(pedido.getDataInicio());
        response.setDataFim(pedido.getDataFim());
        response.setProdutos(pedido.getProdutos().stream()
                            .map(ProdutoResponse::fromEntity)
                            .toList());
        response.setPedidos(pedido.getPedidos().stream()
                            .map(PedidoResponse::fromEntity)
                            .toList());
        return response;
    }
}
