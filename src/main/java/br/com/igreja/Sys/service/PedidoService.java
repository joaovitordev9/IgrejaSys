package br.com.igreja.Sys.service;


import br.com.igreja.Sys.dto.ItemPedidoRequest;
import br.com.igreja.Sys.dto.PedidoRequest;
import br.com.igreja.Sys.dto.PedidoResponse;

import br.com.igreja.Sys.entity.ItemPedido;
import br.com.igreja.Sys.entity.Pedido;
import br.com.igreja.Sys.entity.Produto;
import br.com.igreja.Sys.repository.PedidoRepository;
import br.com.igreja.Sys.repository.ProdutoRepository;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
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
        BigDecimal total = BigDecimal.ZERO;

        for (ItemPedidoRequest itemRequest : pedidoRequest.getItens()) {

            Produto produto = produtoRepository
                    .findById(itemRequest.getProdutoId())
                    .orElseThrow(() -> new RuntimeException("Produto não encontrado"));

            ItemPedido itemPedido = new ItemPedido();

            itemPedido.setPedido(pedido);
            itemPedido.setProduto(produto);
            itemPedido.setQuantidade(itemRequest.getQuantidade());
            itemPedido.setPrecoUnitario(produto.getPreco());

            pedido.getItens().add(itemPedido);

            BigDecimal subtotal = produto.getPreco()
                    .multiply(BigDecimal.valueOf(itemRequest.getQuantidade()));

            total = total.add(subtotal);
        }

        pedido.setValorTotal(total);
        pedido = pedidoRepository.save(pedido);

        return PedidoResponse.fromEntity(pedido);
    }

    public PedidoResponse alterar(Long id, PedidoRequest request){

        Pedido pedido = pedidoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Pedido não encontrado"));

        pedido.getItens().clear();

        for(ItemPedidoRequest itemRequest : request.getItens()){

            Produto produto = produtoRepository.findById(itemRequest.getProdutoId())
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
