package br.com.igreja.Sys.controller;

import br.com.igreja.Sys.dto.PedidoResponse;
import br.com.igreja.Sys.dto.ProdutoRequest;
import br.com.igreja.Sys.dto.ProdutoResponse;
import br.com.igreja.Sys.service.ProdutoService;
import jakarta.persistence.Id;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/produtos")
public class ProdutoController {

    private final ProdutoService produtoService;

    public ProdutoController(ProdutoService produtoService){
        this.produtoService = produtoService;
    }

    @GetMapping
    public List<ProdutoResponse> listar(){
        return produtoService.listar();
    }

    @GetMapping("/{Id}")
    public ProdutoResponse listarId(@PathVariable long Id){
        return produtoService.buscarPorId(Id);
    }

    @PostMapping
    public ProdutoResponse cadastrar(@RequestBody ProdutoRequest produtoRequest){
        return produtoService.cadastrar(produtoRequest);
    }

    @PutMapping("/{Id}")
    public ProdutoResponse alterar(@PathVariable long Id, @RequestBody ProdutoRequest produtoRequest){
        return produtoService.alterar(Id,produtoRequest);
    }

    @DeleteMapping("/{Id}")
    public void deletar(@PathVariable long Id){
        produtoService.deletar(Id);
    }


}
