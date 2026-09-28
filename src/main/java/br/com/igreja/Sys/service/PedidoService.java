package br.com.igreja.Sys.service;


import br.com.igreja.Sys.dto.ItemPedidoRequest;
import br.com.igreja.Sys.dto.PedidoRequest;
import br.com.igreja.Sys.dto.PedidoResponse;

import br.com.igreja.Sys.entity.Festa;
import br.com.igreja.Sys.entity.ItemPedido;
import br.com.igreja.Sys.entity.Pedido;
import br.com.igreja.Sys.entity.Produto;
import br.com.igreja.Sys.repository.FestaRepository;
import br.com.igreja.Sys.repository.PedidoRepository;
import br.com.igreja.Sys.repository.ProdutoRepository;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;


@Service
public class PedidoService {

    private final ProdutoRepository produtoRepository;
    private final PedidoRepository pedidoRepository;
    private final FestaRepository festaRepository;
    private final ImpressoraService impressoraService;

    public PedidoService(PedidoRepository pedidoRepository,
                         ProdutoRepository produtoRepository,
                         FestaRepository festaRepository, ImpressoraService impressoraService) {
        this.pedidoRepository = pedidoRepository;
        this.produtoRepository = produtoRepository;
        this.festaRepository = festaRepository;
        this.impressoraService = impressoraService;
    }

    public List<PedidoResponse> listar(long festaId){

        List<Pedido> pedidos = pedidoRepository.findByFestaId(festaId);

        return pedidos.stream().map(PedidoResponse::fromEntity).toList();
    }

    public PedidoResponse buscarPorId(long id){
        Pedido pedido = pedidoRepository.findById(id).get();
        return PedidoResponse.fromEntity(pedido);
    }

    public PedidoResponse cadastrar(long festaId, PedidoRequest pedidoRequest){
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

        Festa festa =  festaRepository
                .findById(festaId)
                .orElseThrow(() -> new RuntimeException("Festa não encontrada"));

        pedido.setFesta(festa);

        pedido.setValorTotal(total);
        pedido = pedidoRepository.save(pedido);

        impressoraService.imprimirPedido(pedido);

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
