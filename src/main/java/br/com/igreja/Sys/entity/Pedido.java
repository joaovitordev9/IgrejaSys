package br.com.igreja.Sys.entity;


import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Getter
@Setter
public class Pedido {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @OneToMany(mappedBy = "pedido")
    private List<ItemPedido> itens;

    private BigDecimal valorTotal;

    @CreationTimestamp
    private LocalDateTime dataCriacao;

}
