package br.com.igreja.Sys.service;


import br.com.igreja.Sys.dto.ItemPedidoRequest;
import br.com.igreja.Sys.dto.PedidoRequest;
import br.com.igreja.Sys.dto.PedidoResponse;

import br.com.igreja.Sys.entity.ItemPedido;
import br.com.igreja.Sys.entity.Pedido;
import br.com.igreja.Sys.entity.Produto;
import br.com.igreja.Sys.repository.PedidoRepository;
import br.com.igreja.Sys.repository.ProdutoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class PedidoService {

    PedidoRepository pedidoRepository;
    ProdutoRepository produtoRepository;

    public PedidoService(PedidoRepository pedidoRepository,
                         ProdutoRepository produtoRepository) {
        this.pedidoRepository = pedidoRepository;
        this.produtoRepository = produtoRepository;
    }

    public List<PedidoResponse> listar(){

        List<Pedido> pedidos = pedidoRepository.findAll();

        return pedidos.stream().map(PedidoResponse::fromEntity).toList();
    }

    public PedidoResponse buscarPorId(long id){
        Pedido pedido = pedidoRepository.findById(id).get();
        return PedidoResponse.fromEntity(pedido);
    }

    public PedidoResponse cadastrar(PedidoRequest pedidoRequest){
        Pedido pedido = new Pedido();
        for (ItemPedidoRequest itemRequest : pedidoRequest.getItens()) {

            Produto produto = produtoRepository
                    .findById(itemRequest.getProdutoId())
                    .orElseThrow(() -> new RuntimeException("Produto não encontrado"));

            ItemPedido itemPedido = new ItemPedido();

            itemPedido.setPedido(pedido);
            itemPedido.setProduto(produto);
            itemPedido.setQuantidade(itemRequest.getQuantidade());

            pedido.getItens().add(itemPedido);
        }
        pedido = pedidoRepository.save(pedido);

        return PedidoResponse.fromEntity(pedido);
    }

    public void deletar(long id){
        pedidoRepository.deleteById(id);
    }

}
