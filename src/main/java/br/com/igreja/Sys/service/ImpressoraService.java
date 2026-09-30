package br.com.igreja.Sys.service;

import br.com.igreja.Sys.entity.ItemPedido;
import br.com.igreja.Sys.entity.Pedido;
import org.springframework.stereotype.Service;

import javax.print.*;

@Service
public class ImpressoraService {

    public void imprimir(String texto) {

        try {

            PrintService impressora = PrintServiceLookup.lookupDefaultPrintService();

            if (impressora == null) {
                throw new RuntimeException("Nenhuma impressora encontrada");
            }

            DocPrintJob job = impressora.createPrintJob();

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
}