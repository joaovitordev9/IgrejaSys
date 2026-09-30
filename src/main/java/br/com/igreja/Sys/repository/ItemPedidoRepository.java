package br.com.igreja.Sys.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import br.com.igreja.Sys.dto.RelatorioQuantidadeProdutoVendidoResponse;
import br.com.igreja.Sys.entity.ItemPedido;

public interface ItemPedidoRepository extends JpaRepository<ItemPedido, Long> {

    @Query("""
        SELECT new br.com.igreja.Sys.dto.RelatorioQuantidadeProdutoVendidoResponse(
            p.nome,
            SUM(i.quantidade),
            SUM(i.quantidade * i.precoUnitario)
        )
        FROM ItemPedido i
        JOIN i.produto p
        WHERE p.festa.id = :idFesta
        GROUP BY p.id, p.nome
        ORDER BY SUM(i.quantidade) DESC
    """)
    List<RelatorioQuantidadeProdutoVendidoResponse> buscarQuantidadeProdutosVendidos(Long idFesta);
}
