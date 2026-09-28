package br.com.igreja.Sys.dto;

import br.com.igreja.Sys.entity.Categoria;
import br.com.igreja.Sys.entity.Festa;
import br.com.igreja.Sys.entity.Produto;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;


@Getter
@Setter
public class ProdutoRequest {

    @NotBlank 
    private String nome;

    @NotNull 
    @Positive 
    private BigDecimal preco;

    @NotNull 
    private Long categoriaId;

    public void preencher(Produto produto, Categoria categoria, Festa festa){
        produto.setNome(nome);
        produto.setPreco(preco);
        produto.setCategoria(categoria);
        produto.setFesta(festa);

    }
}
