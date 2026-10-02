package br.com.igreja.Sys.service;

import br.com.igreja.Sys.dto.CategoriaResponse;
import br.com.igreja.Sys.dto.ImpressoraResponse;
import br.com.igreja.Sys.entity.ItemPedido;
import br.com.igreja.Sys.entity.Pedido;
import br.com.igreja.Sys.model.Impressora;
import jakarta.annotation.PostConstruct;
import lombok.Getter;

import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

import javax.print.*;
import javax.print.attribute.standard.PrinterIsAcceptingJobs;

@Getter 
@Service
public class ImpressoraService {

    private List<Impressora> impressoras = new ArrayList<>();
    private Impressora impressoraSelecionada;

    public boolean impressoraDisponivel(PrintService impressora) {

        if (impressora == null) {
            return false;
        }

        PrinterIsAcceptingJobs estado =
                impressora.getAttribute(PrinterIsAcceptingJobs.class);

        return estado != null &&
                estado.equals(PrinterIsAcceptingJobs.ACCEPTING_JOBS);
    }

    public void imprimir(String texto) {

        try {
            if (!impressoraDisponivel(impressoraSelecionada.getImpressora())) {
                throw new RuntimeException("Nenhuma impressora encontrada");
            }
            System.out.println("imprimiu sabosta");

            DocPrintJob job = impressoraSelecionada.getImpressora().createPrintJob();

            byte[] textoBytes = texto.getBytes();

            byte[] corteParcial = new byte[] {
                    0x1D, 0x56, 0x01
            };

            byte[] dados = new byte[textoBytes.length + corteParcial.length];

            System.arraycopy(textoBytes, 0, dados, 0, textoBytes.length);
            System.arraycopy(corteParcial, 0, dados, textoBytes.length, corteParcial.length);

            DocFlavor flavor = DocFlavor.BYTE_ARRAY.AUTOSENSE;
            Doc doc = new SimpleDoc(dados, flavor, null);

            job.print(doc, null);

        } catch (Exception e) {
            throw new RuntimeException("Erro ao imprimir", e);
        }
    }

    public void imprimirPedido(Pedido pedido) {

        if (impressoraSelecionada == null) {
            return;
        }
        int numeroFicha = 1;

        for (ItemPedido item : pedido.getItens()) {

            for (int i = 0; i < item.getQuantidade(); i++) {

                String ficha =
                        "================================\n" +
                        "FICHA #" +
                        pedido.getId() +
                        "-" +
                        numeroFicha +
                        "\n\n" +
                        item.getProduto().getNome().toUpperCase() +
                        "\n" +
                        "================================\n" +
                        "\n\n\n";

                imprimir(ficha);
                try {
                    Thread.sleep(500);
                } catch (InterruptedException e) {
                    throw new RuntimeException(e);
                }

                numeroFicha++;
            }
        }
    }


    public List<ImpressoraResponse> listar() {
        this.impressoras.clear();
        long ultId = 1;

        PrintService[] impressoras =
                PrintServiceLookup.lookupPrintServices(null, null);

        for (PrintService impressora : impressoras) {

            Impressora response = new Impressora();
            response.setId(ultId++);
            response.setImpressora(impressora);

            response.setSelecionada(
                    impressoraSelecionada != null &&
                    impressoraSelecionada.getNome().equals(impressora.getName())
            );

            this.impressoras.add(response);
        }

        return this.impressoras.stream()
                .map(ImpressoraResponse::fromEntity)
                .toList();
    }

    public void selecionarImpressora(long id) {
        if (id == -1) {
            impressoraSelecionada = null;
            return;
        }

        for (Impressora impressora : impressoras) {
            if (impressora.getId() == id) {
                impressora.setSelecionada(true);
                impressoraSelecionada = impressora;
            }
            else {
                impressora.setSelecionada(false);
            }
        }
    }
}