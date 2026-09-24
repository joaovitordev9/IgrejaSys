package br.com.igreja.Sys.entity;


import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.util.List;

@Entity
@Getter
@Setter
public class Festa {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String nome;
    private LocalDate dataInicio;
    private LocalDate dataFim;

    @OneToMany(mappedBy = "festa")
    private List<Produto> produtos;

    @OneToMany(mappedBy = "festa")
    private List<Pedido> pedidos;
}
