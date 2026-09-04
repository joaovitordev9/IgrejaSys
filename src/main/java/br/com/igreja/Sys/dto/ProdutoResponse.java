package br.com.igreja.Sys.dto;

import br.com.igreja.Sys.entity.Produto;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ProdutoResponse {
    private long id;
    private String nome;
    private String descricao;
    private double preco;

    public static ProdutoResponse fromEntity(Produto produto) {

        ProdutoResponse response = new ProdutoResponse();

        response.setId(produto.getId());
        response.setNome(produto.getNome());
        response.setDescricao(produto.getDescricao());
        response.setPreco(produto.getPreco());

        return response;
    }
}
