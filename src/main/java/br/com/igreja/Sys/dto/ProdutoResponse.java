package br.com.igreja.Sys.dto;

import br.com.igreja.Sys.entity.Produto;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
public class ProdutoResponse {
    private long id;
    private String nome;
    private String descricao;
    private BigDecimal preco;
    private Long categoriaId;

    public static ProdutoResponse fromEntity(Produto produto) {

        ProdutoResponse response = new ProdutoResponse();

        response.setId(produto.getId());
        response.setNome(produto.getNome());
        response.setDescricao(produto.getDescricao());
        response.setPreco(produto.getPreco());
        response.setCategoriaId( produto.getCategoria().getId());

        return response;
    }
}
