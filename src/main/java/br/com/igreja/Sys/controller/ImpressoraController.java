package br.com.igreja.Sys.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.igreja.Sys.dto.ImpressoraResponse;
import br.com.igreja.Sys.service.ImpressoraService;
import br.com.igreja.Sys.service.RelatorioService;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;



@RestController 
@RequestMapping("/impressoras")
public class ImpressoraController {

    private final ImpressoraService impressoraService;

    public ImpressoraController(ImpressoraService impressoraService) {
        this.impressoraService = impressoraService;
    }

    @GetMapping
    public List<ImpressoraResponse> listar() {
        return impressoraService.listar();
    }

    @PostMapping("/selecionar-impressora/{id}")
    public void selecionarImpressora(@PathVariable  long id) {
        impressoraService.selecionarImpressora(id);
    }
    
    

}
