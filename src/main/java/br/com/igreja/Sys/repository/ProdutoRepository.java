package br.com.igreja.Sys.repository;

import br.com.igreja.Sys.entity.Produto;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface ProdutoRepository extends JpaRepository<Produto, Long> {

    List<Produto> findByFestaId(Long idFesta);
}
