package br.com.igreja.Sys.dto;

import java.time.LocalDate;

import br.com.igreja.Sys.entity.Festa;
import lombok.Getter;
import lombok.Setter;

@Getter 
@Setter
public class FestaResponse {
    private long id;
    private String nome;
    private LocalDate dataInicio;
    private LocalDate dataFim;

    public static FestaResponse fromEntity(Festa festa) {
        FestaResponse response = new FestaResponse();

        response.setId(festa.getId());
        response.setNome(festa.getNome());
        response.setDataInicio(festa.getDataInicio());
        response.setDataFim(festa.getDataFim());
        
        return response;
    }
}
