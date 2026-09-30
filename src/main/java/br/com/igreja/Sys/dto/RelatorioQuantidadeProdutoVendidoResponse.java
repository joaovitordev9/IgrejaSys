package br.com.igreja.Sys.dto;

import java.math.BigDecimal;

import lombok.Getter;

@Getter 
public class RelatorioQuantidadeProdutoVendidoResponse {
    private String produto;
    private Long quantidadeVendida;
    private BigDecimal valorTotal;

    public RelatorioQuantidadeProdutoVendidoResponse(String produto, Long quantidadeVendida, BigDecimal valorTotal) {
        this.produto = produto;
        this.quantidadeVendida = quantidadeVendida;
        this.valorTotal = valorTotal;
    }
}
