package br.com.igreja.Sys.dto;

import java.math.BigDecimal;
import java.time.LocalDate;

import lombok.Getter;

@Getter 
public class RelatorioVendasPorDiaResponse {
    private LocalDate data;
    private BigDecimal total;

    public RelatorioVendasPorDiaResponse(LocalDate data, BigDecimal total) {
        this.data = data;
        this.total = total;
    }
}
