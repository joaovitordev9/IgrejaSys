package br.com.igreja.Sys.dto;

import br.com.igreja.Sys.model.Impressora;
import lombok.Getter;
import lombok.Setter;

@Getter 
@Setter 
public class ImpressoraResponse {
    private long id;
    private String nome;
    private boolean selecionada;

    public static ImpressoraResponse fromEntity(Impressora impressora) {
        ImpressoraResponse response = new ImpressoraResponse();

        response.setId(impressora.getId());
        response.setNome(impressora.getNome());
        response.setSelecionada(impressora.getSelecionada());
        
        return response;
    }
}
