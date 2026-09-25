package br.com.igreja.Sys.dto;

import br.com.igreja.Sys.entity.Categoria;
import lombok.Getter;
import lombok.Setter;

@Getter 
@Setter 
public class CategoriaResumo {
    private Long id;
    private String nome;

    public static CategoriaResumo fromEntity(Categoria categoria) {

        CategoriaResumo response = new CategoriaResumo();

        response.setId(categoria.getId());
        response.setNome(categoria.getNome());

        return response;
    }


}
