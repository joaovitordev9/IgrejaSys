package br.com.igreja.Sys.dto;
import br.com.igreja.Sys.entity.Produto;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
public class ProdutoResumo {
    private long id;
    private String nome;
    private String descricao;
    private BigDecimal preco;
    private FestaResponse festa;

    public static ProdutoResumo fromEntity(Produto produto) {

        ProdutoResumo resumo = new ProdutoResumo();

        resumo.setId(produto.getId());
        resumo.setNome(produto.getNome());
        resumo.setPreco(produto.getPreco());
        resumo.setFesta(FestaResponse.fromEntity(produto.getFesta()));
        return resumo;
    }
}
