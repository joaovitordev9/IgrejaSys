package br.com.igreja.Sys.service;


import br.com.igreja.Sys.dto.ProdutoRequest;
import br.com.igreja.Sys.dto.ProdutoResponse;
import br.com.igreja.Sys.entity.Produto;
import br.com.igreja.Sys.repository.ProdutoRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProdutoService {

    private final ProdutoRepository produtoRepository;

    public ProdutoService(ProdutoRepository produtoRepository) {
        this.produtoRepository = produtoRepository;
    }

    public List<ProdutoResponse> listar(){
        List<Produto> produtos = produtoRepository.findAll();

        return produtos.stream().map(ProdutoResponse::fromEntity).toList();
    }

    public ProdutoResponse buscarPorId(long id){
        Produto produto = produtoRepository.findById(id).get();

        return ProdutoResponse.fromEntity(produto);
    }

    public ProdutoResponse cadastrar(ProdutoRequest produtoRequest){
        Produto produto = new Produto();
        produtoRequest.preencher(produto);
        produto = produtoRepository.save(produto);
        return ProdutoResponse.fromEntity(produto);
    }

    public void deletar(long id){
        produtoRepository.deleteById(id);
    }

}
