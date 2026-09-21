package br.com.igreja.Sys.service;

import br.com.igreja.Sys.dto.CategoriaRequest;
import br.com.igreja.Sys.dto.CategoriaResponse;
import br.com.igreja.Sys.entity.Categoria;
import br.com.igreja.Sys.repository.CategoriaRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoriaService {
    private CategoriaRepository categoriaRepository;

    public CategoriaService(CategoriaRepository categoriaRepository) {
        this.categoriaRepository = categoriaRepository;
    }

    public CategoriaResponse cadastrar(CategoriaRequest request) {
        Categoria categoria = request.toEntity();
        categoria = categoriaRepository.save(categoria);
        return CategoriaResponse.fromEntity(categoria);
    }

    public List<CategoriaResponse> listar() {
        return categoriaRepository.findAll()
                .stream()
                .map(CategoriaResponse::fromEntity)
                .toList();
    }

    public CategoriaResponse buscarPorId(Long id) {
        Categoria categoria = buscarEntidadePorId(id);

        return CategoriaResponse.fromEntity(categoria);
    }

    public CategoriaResponse atualizar(Long id, CategoriaRequest request) {
        Categoria categoria = buscarEntidadePorId(id);
        request.preencher(categoria);

        categoria = categoriaRepository.save(categoria);

        return CategoriaResponse.fromEntity(categoria);
    }


    public Categoria buscarEntidadePorId(Long id) {
        return categoriaRepository.findById(id).orElseThrow(() -> new RuntimeException("Categoria não encontrada"));
    }

    public void excluir(Long id) {
        Categoria categoria = buscarEntidadePorId(id);

        categoriaRepository.delete(categoria);
    }
}
