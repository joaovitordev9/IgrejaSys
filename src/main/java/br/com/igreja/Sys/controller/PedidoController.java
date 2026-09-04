package br.com.igreja.Sys.controller;


import br.com.igreja.Sys.dto.ProdutoResponse;
import br.com.igreja.Sys.service.ProdutoService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/pedidos")
public class PedidoController {

    private ProdutoService produtoService;


    @GetMapping
    public ResponseEntity<ProdutoResponse> listar(){

    }

}
