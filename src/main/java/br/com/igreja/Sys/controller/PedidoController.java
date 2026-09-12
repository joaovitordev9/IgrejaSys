package br.com.igreja.Sys.controller;


import br.com.igreja.Sys.dto.PedidoRequest;
import br.com.igreja.Sys.dto.PedidoResponse;
import br.com.igreja.Sys.dto.ProdutoRequest;
import br.com.igreja.Sys.dto.ProdutoResponse;
import br.com.igreja.Sys.service.PedidoService;
import br.com.igreja.Sys.service.ProdutoService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/pedidos")
public class PedidoController {

    private PedidoService pedidoService;

    public PedidoController(PedidoService pedidoService) {
        this.pedidoService = pedidoService;
    }

    @GetMapping
    public List<PedidoResponse> listar(){
        return pedidoService.listar();
    }

    @PostMapping
    public PedidoResponse cadastrar(@RequestBody PedidoRequest pedidoRequest){
        return pedidoService.cadastrar(pedidoRequest);
    }
}
