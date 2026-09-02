package br.com.igreja.Sys.repository;

import br.com.igreja.Sys.entity.Produto;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProdutoRepository extends JpaRepository<Produto,Integer> {
}
