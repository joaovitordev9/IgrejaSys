package br.com.igreja.Sys.controller;


import br.com.igreja.Sys.dto.PedidoRequest;
import br.com.igreja.Sys.dto.PedidoResponse;
import br.com.igreja.Sys.service.PedidoService;
import org.springframework.web.bind.annotation.*;


import java.util.List;

@CrossOrigin(origins = "http://localhost:63342")
@RestController
@RequestMapping("/festas/{idFesta}/pedidos")
public class PedidoController {

    private final PedidoService pedidoService;

    public PedidoController(PedidoService pedidoService) {
        this.pedidoService = pedidoService;

    }

    @GetMapping
    public List<PedidoResponse> listar(@PathVariable long idFesta){
        return pedidoService.listar(idFesta);
    }

    @GetMapping("/{Id}")
    public PedidoResponse listarId(@PathVariable long Id){
        return pedidoService.buscarPorId(Id);
    }

    @PostMapping
    public PedidoResponse cadastrar(@PathVariable long idFesta, @RequestBody PedidoRequest pedidoRequest){
        return pedidoService.cadastrar(idFesta, pedidoRequest);
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
