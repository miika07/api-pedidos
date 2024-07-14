import { Not, Repository } from "typeorm";
import { PedidoRepositoryInterface } from "../../../core/applications/ports/pedidoRepository";
import { PedidoEntity } from "../../../core/domain/entities/pedidos";

export class PedidoRepositoryAdapter implements PedidoRepositoryInterface {

    private pedidoRepository: Repository<PedidoEntity>;

    constructor(pedidoRepository: Repository<PedidoEntity>) {
        this.pedidoRepository = pedidoRepository;
    }

    async criarPedido(pedido: PedidoEntity): Promise<PedidoEntity> {
        return this.pedidoRepository.save(pedido);
    }

    async buscarTodosPedidos(): Promise<PedidoEntity[]> {
        return this.pedidoRepository.find();
    }

    async buscarPedidoPorUuid(uuid: string): Promise<PedidoEntity | undefined> {
        return this.pedidoRepository.findOne({ where: { uuid: uuid } });
    }

    async buscarPedidoPorNumeroPedido(numeroPedido: number): Promise<PedidoEntity | undefined> {
        return this.pedidoRepository.findOne({ where: { numeroPedido: numeroPedido } });
    }

    async buscarPedidoPorStatus(status: string): Promise<PedidoEntity[]> {
        return this.pedidoRepository.find({ where: { status: status } });
    }

    async atualizarPedido(pedido: PedidoEntity): Promise<PedidoEntity> {
        const pedidoExistente = await this.pedidoRepository.findOne({ where: { uuid: pedido.uuid } });

        if (!pedidoExistente) {
            throw new Error('Pedido não encontrado');
        }

        return this.pedidoRepository.save(pedido);
    }

    async deletarPedido(id: string): Promise<boolean> {
        const result = await this.pedidoRepository.delete(id);
        return result.affected !== undefined && result.affected > 0;
    }

    async buscarPedidosNaoFinalizados(): Promise<PedidoEntity[]> {
        const result = this.pedidoRepository.find({
            where: [
                { status: Not("PENDENTE") },
                { status: Not("FINALIZADO") }
            ],
            order: { status: 'ASC', updatedAt: 'ASC' },
        });
        return result;
    }
}