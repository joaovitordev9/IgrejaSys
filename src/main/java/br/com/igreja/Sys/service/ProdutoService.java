package br.com.igreja.Sys.service;


import br.com.igreja.Sys.dto.ProdutoRequest;
import br.com.igreja.Sys.dto.ProdutoResponse;
import br.com.igreja.Sys.entity.Categoria;
import br.com.igreja.Sys.entity.Festa;
import br.com.igreja.Sys.entity.Produto;
import br.com.igreja.Sys.repository.CategoriaRepository;
import br.com.igreja.Sys.repository.FestaRepository;
import br.com.igreja.Sys.repository.ItemPedidoRepository;
import br.com.igreja.Sys.repository.ProdutoRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class ProdutoService {

    private final ProdutoRepository produtoRepository;
    private final CategoriaRepository categoriaRepository;    
    private final FestaRepository festaRepository;
    private final  ItemPedidoRepository itemPedidoRepository;


    public ProdutoService(ProdutoRepository produtoRepository, CategoriaRepository categoriaRepository, FestaRepository festaRepository, ItemPedidoRepository itemPedidoRepository) {
        this.produtoRepository = produtoRepository;
        this.categoriaRepository = categoriaRepository;
        this.festaRepository = festaRepository;
        this.itemPedidoRepository = itemPedidoRepository;
    }

    public List<ProdutoResponse> listar(long festaId){
        List<Produto> produtos = produtoRepository.findByFestaId(festaId);
        System.out.println("Produtos encontrados: " + produtos.size() + festaId);
        return produtos.stream().map(ProdutoResponse::fromEntity).toList();
    }

    public ProdutoResponse buscarPorId(long id){
        Produto produto = produtoRepository.findById(id).get();

        return ProdutoResponse.fromEntity(produto);
    }

    public ProdutoResponse cadastrar(long festaId, ProdutoRequest produtoRequest){
        
        Categoria categoria = categoriaRepository
                .findById(produtoRequest.getCategoriaId())
                .orElseThrow(() -> new RuntimeException("Categoria não encontrada"));

        Festa festa =  festaRepository
                .findById(festaId)
                .orElseThrow(() -> new RuntimeException("Festa não encontrada"));

        Produto produto = new Produto();
        produtoRequest.preencher(produto, categoria, festa);

        produto = produtoRepository.save(produto);
        return ProdutoResponse.fromEntity(produto);
    }

    public ProdutoResponse alterar(long id,ProdutoRequest produtoRequest){
        Produto produto = produtoRepository.findById(id).orElseThrow(() -> new RuntimeException("Produto não encontrado"));

        produto.setNome(produtoRequest.getNome());
        produto.setPreco(produtoRequest.getPreco());

        Categoria categoria = categoriaRepository
                .findById(produtoRequest.getCategoriaId())
                .orElseThrow(() -> new RuntimeException("Categoria não encontrada"));

        produto.setCategoria(categoria);
        produto = produtoRepository.save(produto);

        return ProdutoResponse.fromEntity(produto);
    }

    public void deletar(Long id) {

        if (itemPedidoRepository.existsByProdutoId(id)) {
            throw new RuntimeException(
                    "Não é possível excluir este produto, pois ele está sendo utilizado em um pedido."
            );
        }

        produtoRepository.deleteById(id);
    }

}
