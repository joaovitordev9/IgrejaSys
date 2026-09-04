package br.com.igreja.Sys.dto;


import jakarta.validation.constraints.NotEmpty;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class PedidoRequest {

    @NotEmpty
    private List<ItemPedidoRequest> itens;

}
