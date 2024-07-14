import { PedidoRepositoryAdapter } from "../../../../infra/adapter/pedido/pedidoRepositoryAdapter";
import { PedidoEntity } from "../../../domain/entities/pedidos";
import { parserPedidosComDescricao, parserCheckoutPedido, parserItems, parserNewPedidoDB, parserPedido, parserPedidoDB, parserPedidos } from "../../adapters/pedido";
import { ItemPedido } from "../../models/itensPedido";
import { CheckoutPedidoResponse, Pedido, Status } from "../../models/pedido";

export default class PedidoManagerUseCase {

    private adapter: PedidoRepositoryAdapter;

    constructor(adapter: PedidoRepositoryAdapter
    ) {
        this.adapter = adapter;
    }

    async criarPedido(idCliente: string, status: string, itensPedido: ItemPedido[]): Promise<Pedido> {
        const pedidoDB: PedidoEntity = parserNewPedidoDB(idCliente, status, itensPedido);
        const response = await this.adapter.criarPedido(pedidoDB)
        return parserPedido(response);
    }

    async buscarTodosPedidos(): Promise<Pedido[]> {
        const response = await this.adapter.buscarTodosPedidos();
        return parserPedidos(response);
    }

    async buscarPedidoPorUuid(uuid: string): Promise<Pedido> {
        const response = await this.adapter.buscarPedidoPorUuid(uuid);
        return response ? parserPedido(response) : response;
    }

    async buscarPedidoPorStatus(status: string): Promise<Pedido[]> {
        const response = await this.adapter.buscarPedidoPorStatus(status);
        return response ? parserPedidos(response) : response;
    }

    async atualizarPedido(uuid: string, status: string, itensPedido: ItemPedido[]): Promise<Pedido | undefined> {
        const pedido = await this.adapter.buscarPedidoPorUuid(uuid);
        if (pedido) {
            const itensPedidoParsed = parserItems(itensPedido, pedido.itensPedido);
            const pedidoDB = parserPedidoDB(pedido.id, pedido.uuid, pedido.idCliente, status, itensPedidoParsed.itensPedidoDB, pedido.numeroPedido);
            const response = await this.adapter.atualizarPedido(pedidoDB);
            return parserPedido(response);
        }

        return pedido;
    }

    async atualizarStatusPedido(uuid: string, status: string): Promise<Pedido | undefined> {
        const pedido = await this.adapter.buscarPedidoPorUuid(uuid);
        if (pedido) {
            pedido.status = status
            const response = await this.adapter.atualizarPedido(pedido);
            return parserPedido(response);
        }
        return pedido;
    }

    async deletarPedido(id: string): Promise<boolean> {
        return this.adapter.deletarPedido(id);
    }

    async buscarPedidosNaoFinalizados(): Promise<Pedido[]> {
        const response = await this.adapter.buscarPedidosNaoFinalizados();
        const pedidosComParse = parserPedidosComDescricao(response);

        const listaPronto = pedidosComParse.filter(objeto => objeto.status === Status.PRONTO);
        const listaEmPreparacao = pedidosComParse.filter(objeto => objeto.status === Status.EM_PREPARACAO);
        const listaRecebido = pedidosComParse.filter(objeto => objeto.status === Status.RECEBIDO);

        const result = listaPronto.concat(listaEmPreparacao, listaRecebido);

        return result;
    }

    async checkoutPedido(idCliente: string, status: string, itensPedido: ItemPedido[]): Promise<CheckoutPedidoResponse> {
        const pedidoDB: PedidoEntity = parserNewPedidoDB(idCliente, status, itensPedido);
        const response = await this.adapter.criarPedido(pedidoDB);
        return parserCheckoutPedido(response);
    }
}