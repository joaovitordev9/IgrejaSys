package br.com.igreja.Sys.controller;

import br.com.igreja.Sys.dto.CategoriaRequest;
import br.com.igreja.Sys.dto.CategoriaResponse;
import br.com.igreja.Sys.service.CategoriaService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/categorias")
@CrossOrigin(origins = "http://localhost:5173")
public class CategoriaController {
    private final CategoriaService service;

    public CategoriaController(CategoriaService service) {

        this.service = service;
    }

    @PostMapping
    public CategoriaResponse cadastrar(@RequestBody CategoriaRequest request) {

        return service.cadastrar(request);
    }

    @GetMapping
    public List<CategoriaResponse> listar() {

        return service.listar();
    }

    @GetMapping("/{id}")
    public CategoriaResponse buscarPorId(@PathVariable Long id) {

        return service.buscarPorId(id);
    }

    @PutMapping("/{id}")
    public CategoriaResponse atualizar(@PathVariable Long id, @RequestBody CategoriaRequest request) {
        return service.atualizar(id, request);
    }

    @DeleteMapping("/{id}")
    public void excluir(@PathVariable Long id) {
        service.excluir(id);
    }


}