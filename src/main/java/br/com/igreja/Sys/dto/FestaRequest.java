package br.com.igreja.Sys.dto;

import java.time.LocalDate;

import br.com.igreja.Sys.entity.Festa;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter 
@Setter 
public class FestaRequest {

    @NotBlank 
    private String nome;
    @NotNull 
    private LocalDate dataInicio;
    @NotNull 
    private LocalDate dataFim;

    public Festa toEntity() {

        Festa festa = new Festa();
        preencher(festa);
        return festa;
    }

    public void preencher(Festa festa){
        festa.setNome(nome);
        festa.setDataFim(dataFim);
        festa.setDataInicio(dataInicio);
    }
}
