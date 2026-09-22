
package br.com.igreja.Sys.dto;

import java.time.LocalDate;
import java.util.List;

import br.com.igreja.Sys.entity.Festa;
import lombok.Getter;
import lombok.Setter;

@Getter 
@Setter
public class FestaDetalhesResponse {
    private long id;
    private String nome;
    private LocalDate dataInicio;
    private LocalDate dataFim;
    private List<ProdutoResponse> produtos;
    private List<PedidoResponse> pedidos;

    public static FestaDetalhesResponse fromEntity(Festa festa) {
        FestaDetalhesResponse response = new FestaDetalhesResponse();

        response.setId(festa.getId());
        response.setNome(festa.getNome());
        response.setDataInicio(festa.getDataInicio());
        response.setDataFim(festa.getDataFim());
        response.setProdutos(festa.getProdutos().stream()
                            .map(ProdutoResponse::fromEntity)
                            .toList());
        response.setPedidos(festa.getPedidos().stream()
                            .map(PedidoResponse::fromEntity)
                            .toList());
        return response;
    }
}