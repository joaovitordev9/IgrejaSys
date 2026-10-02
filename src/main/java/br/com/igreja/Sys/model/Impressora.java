package br.com.igreja.Sys.model;

import javax.print.PrintService;

import lombok.Getter;
import lombok.Setter;

@Getter 
@Setter 
public class Impressora {
    private Long id;
    private PrintService impressora;
    private Boolean selecionada;

    public String getNome() {
        return impressora.getName();
    }
}
