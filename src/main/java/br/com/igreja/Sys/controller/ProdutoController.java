package br.com.igreja.Sys.controller;

import br.com.igreja.Sys.dto.ProdutoRequest;
import br.com.igreja.Sys.dto.ProdutoResponse;
import br.com.igreja.Sys.service.ProdutoService;
import jakarta.validation.Valid;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:63342")
@RestController
@RequestMapping("/festas/{idFesta}/produtos")
public class ProdutoController {

    private final ProdutoService produtoService;

    public ProdutoController(ProdutoService produtoService){
        this.produtoService = produtoService;
    }

    @GetMapping
    public List<ProdutoResponse> listar(@PathVariable long idFesta){
        return produtoService.listar(idFesta);
    }

    @GetMapping("{Id}")
    public ProdutoResponse listarId(@PathVariable long idFesta, @PathVariable long Id){
        return produtoService.buscarPorId(Id);
    }

    @PostMapping
    public ProdutoResponse cadastrar(@PathVariable long idFesta, @Valid @RequestBody ProdutoRequest produtoRequest){
        return produtoService.cadastrar(idFesta, produtoRequest);
    }

    @PutMapping("{Id}")
    public ProdutoResponse alterar(@PathVariable long Id, @Valid @RequestBody ProdutoRequest produtoRequest){
        return produtoService.alterar(Id,produtoRequest);
    }

    @DeleteMapping("{Id}")
    public void deletar(@PathVariable long Id){
        produtoService.deletar(Id);
    }

}
