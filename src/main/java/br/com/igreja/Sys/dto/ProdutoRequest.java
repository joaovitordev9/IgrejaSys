package br.com.igreja.Sys.dto;

import br.com.igreja.Sys.entity.Categoria;
import br.com.igreja.Sys.entity.Festa;
import br.com.igreja.Sys.entity.Produto;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;


@Getter
@Setter
public class ProdutoRequest {

    private String nome;
    private String descricao;
    private BigDecimal preco;
    private Long categoriaId;

    public void preencher(Produto produto, Categoria categoria, Festa festa){
        produto.setNome(nome);
        produto.setDescricao(descricao);
        produto.setPreco(preco);
        produto.setCategoria(categoria);
        produto.setFesta(festa);

    }
}
