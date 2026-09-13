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

    private final PedidoService pedidoService;

    public PedidoController(PedidoService pedidoService) {
        this.pedidoService = pedidoService;

    }

    @GetMapping
    public List<PedidoResponse> listar(){
        return pedidoService.listar();
    }

    @GetMapping("/{Id}")
    public PedidoResponse listarId(@PathVariable long Id){
        return pedidoService.buscarPorId(Id);
    }

    @PostMapping
    public PedidoResponse cadastrar(@RequestBody PedidoRequest pedidoRequest){
        return pedidoService.cadastrar(pedidoRequest);
    }

    @PutMapping("/{Id}")
    public PedidoResponse alterar(@PathVariable long Id, @RequestBody PedidoRequest pedidoRequest){
        return pedidoService.alterar(Id, pedidoRequest);
    }

    @DeleteMapping("/{Id}")
    public void deletar(@PathVariable long Id){
        pedidoService.deletar(Id);
    }

}
