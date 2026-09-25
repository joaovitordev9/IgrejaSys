package br.com.igreja.Sys.dto;


import java.util.List;

import br.com.igreja.Sys.entity.Categoria;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CategoriaResponse {
    private Long id;
    private String nome;
    private List<ProdutoResponse> produtos;

    public static CategoriaResponse fromEntity(Categoria categoria) {

        CategoriaResponse response = new CategoriaResponse();

        response.setId(categoria.getId());
        response.setNome(categoria.getNome());
        response.setProdutos(categoria.getProdutos().stream()
                .map(ProdutoResponse::fromEntity)
                .toList());

        return response;
    }
}
