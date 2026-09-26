package br.com.igreja.Sys.dto;


import br.com.igreja.Sys.entity.Categoria;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CategoriaRequest {

    private String nome;

    public Categoria toEntity() {

        Categoria categoria = new Categoria();

        categoria.setNome(nome);
        
        return categoria;
    }

    public void preencher(Categoria categoria){
        categoria.setNome(nome);
    }
}
