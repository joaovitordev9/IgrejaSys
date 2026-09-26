package br.com.igreja.Sys.repository;

import br.com.igreja.Sys.entity.Pedido;
import br.com.igreja.Sys.entity.Produto;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PedidoRepository extends JpaRepository<Pedido, Long> {
    List<Pedido> findByFestaId(Long idFesta);
}
