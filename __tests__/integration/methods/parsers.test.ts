import { PedidoEntity } from '../../../src/core/domain/entities/pedidos';
import { ItemPedidoEntity } from '../../../src/core/domain/entities/itemPedido';
import {
    parserNewPedidoDB,
    parserPedido,
    parserPedidos,
    parserNewItensPedidoDB,
    parserItemPedido,
    parserItems,
    parserCheckoutPedido,
    parserPedidosComQuantidade
} from '../../../src/core/applications/adapters/pedido';
import { ItemPedido } from '../../../src/core/applications/models/itensPedido';
import { Status } from '../../../src/core/applications/models/pedido';
import { ObjectId } from 'mongodb';

describe('Parsers', () => {
    it('deve criar um novo ItemPedidoEntity', () => {
        const idProduto = 'produto123';
        const quantidade = 2;
        const resultado = parserNewItensPedidoDB(idProduto, quantidade);

        expect(resultado).toBeInstanceOf(ItemPedidoEntity);
        expect(resultado.idProduto).toBe(idProduto);
        expect(resultado.quantidade).toBe(quantidade);
    });

    it('deve converter ItemPedidoEntity para ItemPedido', () => {
        const itemPedidoEntity = new ItemPedidoEntity('produto123', 2);
        const resultado = parserItemPedido(itemPedidoEntity);

        expect(resultado).toEqual({ idProduto: 'produto123', quantidade: 2 });
    });

    it('deve atualizar itens de pedido corretamente', () => {
        const itensPedido: ItemPedido[] = [{ idProduto: 'produto123', quantidade: 2 }];
        const itensPedidoDB: ItemPedidoEntity[] = [new ItemPedidoEntity('produto123', 1)];

        const resultado = parserItems(itensPedido, itensPedidoDB);

        expect(resultado.itensPedidoDB).toHaveLength(1);
        expect(resultado.itensPedidoDB[0].quantidade).toBe(2);
    });

    it('deve criar um novo PedidoEntity', () => {
        const idCliente = 'cliente123';
        const status = 'Recebido';
        const itensPedido: ItemPedido[] = [{ idProduto: 'produto123', quantidade: 2 }];
        const resultado = parserNewPedidoDB(idCliente, status, itensPedido);

        expect(resultado).toBeInstanceOf(PedidoEntity);
        expect(resultado.idCliente).toBe(idCliente);
        expect(resultado.status).toBe(status);
        expect(resultado.itensPedido).toHaveLength(1);
    });

    it('deve converter um PedidoEntity para Pedido', () => {
        const pedidoEntity = new PedidoEntity('cliente123', 'Recebido', [new ItemPedidoEntity('produto123', 2)]);
        pedidoEntity.uuid = 'uuid123';
        pedidoEntity.numeroPedido = 1;

        const resultado = parserPedido(pedidoEntity);

        expect(resultado).toEqual({
            uuid: 'uuid123',
            id: new ObjectId(resultado.id),
            idCliente: 'cliente123',
            status: Status['Recebido'],
            itensPedido: [{ idProduto: 'produto123', quantidade: 2 }],
            numeroPedido: 1
        });
    });

    it('deve converter uma lista de PedidoEntity para uma lista de Pedido', () => {
        const pedidosEntity = [new PedidoEntity('cliente123', 'Recebido', [new ItemPedidoEntity('produto123', 2)])];
        pedidosEntity[0].uuid = 'uuid123';
        pedidosEntity[0].numeroPedido = 1;

        const resultado = parserPedidos(pedidosEntity);

        expect(resultado).toHaveLength(1);
        expect(resultado[0]).toEqual({
            uuid: 'uuid123',
            id: new ObjectId(resultado[0].id),
            idCliente: 'cliente123',
            status: Status['Recebido'],
            itensPedido: [{ idProduto: 'produto123', quantidade: 2 }],
            numeroPedido: 1
        });
    });

    it('deve converter PedidoEntity para CheckoutPedidoResponse', () => {
        const pedidoEntity = new PedidoEntity('cliente123', 'Recebido', [new ItemPedidoEntity('produto123', 2)]);
        pedidoEntity.uuid = 'uuid123';
        pedidoEntity.id = null,
        pedidoEntity.numeroPedido = 1;

        const resultado = parserCheckoutPedido(pedidoEntity);

        expect(resultado).toEqual({
            idPedido: 'uuid123',
            numeroPedido: 1
        });
    });

    it('deve converter uma lista de PedidoEntity com descrição', () => {
        const pedidosEntity = [new PedidoEntity('cliente123', 'Recebido', [new ItemPedidoEntity('produto123', 2)])];
        pedidosEntity[0].uuid = 'uuid123';
        pedidosEntity[0].numeroPedido = 1;

        const resultado = parserPedidosComQuantidade(pedidosEntity);

        expect(resultado).toHaveLength(1);
        expect(resultado[0]).toEqual({
            uuid: 'uuid123',
            idCliente: 'cliente123',
            id: new ObjectId(resultado[0].id),
            status: Status['Recebido'],
            itensPedido: [{ idProduto: 'produto123', quantidade: 2 }],
            numeroPedido: 1,
            updateAt: undefined
        });
    });
});