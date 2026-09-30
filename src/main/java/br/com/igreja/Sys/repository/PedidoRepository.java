package br.com.igreja.Sys.repository;

import br.com.igreja.Sys.dto.RelatorioVendasPorDiaResponse;
import br.com.igreja.Sys.entity.Pedido;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

public interface PedidoRepository extends JpaRepository<Pedido, Long> {
    List<Pedido> findByFestaId(Long idFesta);


    @Query("""
        SELECT new br.com.igreja.Sys.dto.RelatorioVendasPorDiaResponse(cast(p.dataCriacao as LocalDate), Sum(p.valorTotal))
        FROM Pedido p
        WHERE p.festa.id = :festaId
        GROUP BY cast(p.dataCriacao as LocalDate)
        ORDER BY cast(p.dataCriacao as LocalDate)
        """)
    List<RelatorioVendasPorDiaResponse> buscarVendasPorDia(Long festaId);


}
