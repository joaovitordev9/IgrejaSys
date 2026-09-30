package br.com.igreja.Sys.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.igreja.Sys.dto.FestaDetalhesResponse;
import br.com.igreja.Sys.dto.FestaRequest;
import br.com.igreja.Sys.dto.FestaResponse;
import br.com.igreja.Sys.service.FestaService;
import jakarta.validation.Valid;

import java.util.List;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;



@RestController 
@RequestMapping("/festas")
public class FestaController {
    private final FestaService festaService;

    public FestaController(FestaService festaService) {
        this.festaService = festaService;
    }

    @GetMapping
    public List<FestaResponse> listar() {
        return festaService.listar();
    }

    @GetMapping("/{Id}")
    public FestaDetalhesResponse listarId(@PathVariable Long id) {
        return festaService.buscarPorId(id);
    }
    
    @PostMapping
    public FestaResponse cadastrar(@Valid @RequestBody FestaRequest request) {
        return festaService.cadastrar(request);
    }

    @PutMapping("/{Id}")
    public FestaResponse alterar(@PathVariable long Id, @Valid @RequestBody FestaRequest request){
        return festaService.alterar(Id, request);
    }

    @DeleteMapping("/{Id}")
    public void deletar(@PathVariable long Id){
        festaService.deletar(Id);
    }
}
