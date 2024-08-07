import { PedidoEntity } from "../../domain/entities/pedidos";

export interface PedidoRepositoryInterface {
    criarPedido(pedido: PedidoEntity): Promise<PedidoEntity>;
    buscarTodosPedidos(): Promise<PedidoEntity[]>;
    buscarPedidoPorUuid(uuid: string): Promise<PedidoEntity | undefined>;
    buscarPedidoPorStatus(status: string): Promise<PedidoEntity[]>;
    atualizarPedido(pedido: PedidoEntity): Promise<PedidoEntity | undefined>;
    deletarPedido(id: string): Promise<boolean>;
    buscarPedidosNaoFinalizados(): Promise<PedidoEntity[]>;
}