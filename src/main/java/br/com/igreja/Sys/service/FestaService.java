package br.com.igreja.Sys.service;

import java.util.List;

import org.springframework.stereotype.Service;

import br.com.igreja.Sys.dto.FestaDetalhesResponse;
import br.com.igreja.Sys.dto.FestaRequest;
import br.com.igreja.Sys.dto.FestaResponse;
import br.com.igreja.Sys.entity.Festa;
import br.com.igreja.Sys.repository.FestaRepository;

@Service 
public class FestaService {
    
    private final FestaRepository festaRepository;

    public FestaService(FestaRepository festaRepository){
        this.festaRepository = festaRepository;
    }

    public List<FestaResponse> listar(){
        List<Festa> festas = festaRepository.findAll();

        return festas.stream().map(FestaResponse::fromEntity).toList();
    }

    public FestaDetalhesResponse buscarPorId(long id) {
        Festa festa = festaRepository.findById(id).get();

        return FestaDetalhesResponse.fromEntity(festa);
    }

    public FestaResponse cadastrar(FestaRequest request) {
        if (request.getDataFim().isBefore(request.getDataInicio())) {
            throw new IllegalArgumentException(
                "A data de término não pode ser anterior à data de início"
            );
        }

        Festa festa = new Festa();
        request.preencher(festa);

        festa = festaRepository.save(festa);
        return FestaResponse.fromEntity(festa);
    }

    public FestaResponse alterar(long id, FestaRequest request) {
        if (request.getDataFim().isBefore(request.getDataInicio())) {
            throw new IllegalArgumentException(
                "A data de término não pode ser anterior à data de início"
            );
        }
        Festa festa = festaRepository.findById(id).orElseThrow(() -> new RuntimeException("Festa não encontrada"));

        festa.setNome(request.getNome());
        festa.setDataInicio(request.getDataInicio());
        festa.setDataFim(request.getDataFim());

        festa = festaRepository.save(festa);
        return FestaResponse.fromEntity(festa);
    }

    public void deletar(long id) {
        festaRepository.deleteById(id);
    }

}
