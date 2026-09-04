package br.com.igreja.Sys.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ItemPedidoRequest {
    @NotNull
    private Long produtoId;

    @NotNull
    private Long quantidade;

}
