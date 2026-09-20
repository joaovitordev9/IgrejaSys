package br.com.igreja.Sys.dto;


import br.com.igreja.Sys.entity.Categoria;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CategoriaResponse {
    private Long id;
    private String nome;

    public static CategoriaResponse fromEntity(Categoria categoria) {

        CategoriaResponse response = new CategoriaResponse();

        response.setId(categoria.getId());
        response.setNome(categoria.getNome());

        return response;
    }
}
