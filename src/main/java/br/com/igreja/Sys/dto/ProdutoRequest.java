package br.com.igreja.Sys.dto;

import br.com.igreja.Sys.entity.Produto;
import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
public class ProdutoRequest {

    private String nome;
    private String descricao;
    private double preco;

    public void preencher(Produto produto){
        produto.setNome(nome);
        produto.setDescricao(descricao);
        produto.setPreco(preco);
    }
}
