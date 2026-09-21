package br.com.igreja.Sys.repository;

import br.com.igreja.Sys.entity.Categoria;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoriaRepository extends JpaRepository<Categoria,Long> {
}
