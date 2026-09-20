package br.com.igreja.Sys.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Entity
@Getter
@Setter
public class ItemPedido {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @ManyToOne
    private Pedido pedido;

    @NotNull
    @ManyToOne
    private Produto produto;

    @NotNull
    private Integer quantidade;

    @NotNull
    private BigDecimal precoUnitario;

}
