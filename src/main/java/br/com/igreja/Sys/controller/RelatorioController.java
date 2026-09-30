package br.com.igreja.Sys.controller;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.igreja.Sys.dto.RelatorioVendasPorDiaResponse;
import br.com.igreja.Sys.service.RelatorioService;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;


@RestController 
@RequestMapping("/festas/{idFesta}/relatorios")
public class RelatorioController {
    
    private final RelatorioService relatorioService;

    public RelatorioController(RelatorioService relatorioService) {
        this.relatorioService = relatorioService;
    }

    @GetMapping("/vendas-por-dia")
    public List<RelatorioVendasPorDiaResponse> buscarVendasPorDia(@PathVariable long idFesta) {
        return relatorioService.buscarVendasPorDia(idFesta);
    }
    
}
