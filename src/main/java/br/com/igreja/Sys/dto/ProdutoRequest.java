package br.com.igreja.Sys.dto;

import br.com.igreja.Sys.entity.Produto;

public class ProdutoRequest {

    private String nome;
    private String descricao;

    public void preencher(Produto produto){
        produto.setNome(nome);
        produto.setDescricao(descricao);
    }
}
