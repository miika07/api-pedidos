import { ObjectId } from "typeorm";
import { ItemPedidoEntity } from "../../domain/entities/itemPedido";
import { PedidoEntity } from "../../domain/entities/pedidos";
import { ItemPedido } from "../models/itensPedido";
import { CheckoutPedidoResponse, Pedido, Status } from "../models/pedido";

export const parserNewItensPedidoDB = (idProduto: string, quantidade: number): ItemPedidoEntity => {
    const itemPedidoDB = new ItemPedidoEntity(idProduto, quantidade);
    return itemPedidoDB;
}

export const parserItemPedido = (itemPedidoDB: ItemPedidoEntity): ItemPedido => {
    return {
        idProduto: itemPedidoDB.idProduto,
        quantidade: itemPedidoDB.quantidade
    }
}

export const parserItems = (itensPedido: ItemPedido[], itensPedidoDB: ItemPedidoEntity[]) => {

    let listaAtualizadaItens = [];
    itensPedido.forEach(item => {

        let itemAtualizado;

        let itemExistente = itensPedidoDB.find(existe => {
            let obj: any = existe.idProduto;
            if (item.idProduto == obj.id) return existe;
        });

        if (itemExistente) {
            itemAtualizado = itemExistente;
            itemAtualizado.quantidade = item.quantidade;
        } else {
            itemAtualizado = new ItemPedidoEntity();
            itemAtualizado.idProduto = item.idProduto;
            itemAtualizado.quantidade = item.quantidade;
        }

        listaAtualizadaItens.push(itemAtualizado);
    });

    let listaRemover = itensPedidoDB.filter(item => !listaAtualizadaItens.includes(item));

    return { itensPedidoDB: listaAtualizadaItens, itensRemover: listaRemover };
}

export const parserNewPedidoDB = (idCliente: string, status: string, itensPedido: ItemPedido[]): PedidoEntity => {
    const itensPedidoDB: ItemPedidoEntity[] = itensPedido.map(item => parserNewItensPedidoDB(item.idProduto, item.quantidade));
    const produto = new PedidoEntity(idCliente, status, itensPedidoDB);
    return produto;
}

export const parserPedidoDB = (id: ObjectId, uuid: string, idCliente: string, status: string, itensPedido: ItemPedidoEntity[], numeroPedido: number): PedidoEntity => {
    return {
        id,
        uuid,
        idCliente,
        status,
        itensPedido,
        numeroPedido
    }
}

export const parserPedido = (pedidoDB: PedidoEntity): Pedido => {
    return {
        ...pedidoDB.id && { id: pedidoDB.id },
        ...pedidoDB.uuid && { uuid: pedidoDB.uuid },
        ...pedidoDB.idCliente && { idCliente: pedidoDB.idCliente },
        status: Status[pedidoDB.status],
        itensPedido: pedidoDB.itensPedido.map(item => parserItemPedido(item)),
        numeroPedido: pedidoDB.numeroPedido
    }
}

export const parserPedidos = (pedidosDB: PedidoEntity[]): Pedido[] => {
    const pedidos: Pedido[] = [];
    pedidosDB.forEach((pedidoDB) => {
        pedidos.push({
            ...pedidoDB.id && { id: pedidoDB.id },
            ...pedidoDB.uuid && { uuid: pedidoDB.uuid },
            ...pedidoDB.idCliente && { idCliente: pedidoDB.idCliente },
            status: Status[pedidoDB.status],
            itensPedido: pedidoDB.itensPedido.map(item => parserItemPedido(item)),
            numeroPedido: pedidoDB.numeroPedido
        })
    })
    return pedidos;
}

export const parserPedidosComQuantidade = (pedidosDB: PedidoEntity[]) => {
    let pedidos = [];
    pedidosDB.forEach((pedidoDB) => {
        pedidos.push({
            ...pedidoDB.id && { id: pedidoDB.id },
            ...pedidoDB.uuid && { uuid: pedidoDB.uuid },
            ...pedidoDB.idCliente && { idCliente: pedidoDB.idCliente },
            status: Status[pedidoDB.status],
            itensPedido: pedidoDB.itensPedido.map(item => parserItemPedido(item)),
            numeroPedido: pedidoDB.numeroPedido,
            updateAt: pedidoDB.updatedAt
        })
    })
    return pedidos;
}

export const parserCheckoutPedido = (pedidoDB: PedidoEntity): CheckoutPedidoResponse => {
    return {
        idPedido: pedidoDB.uuid,
        numeroPedido: pedidoDB.numeroPedido
    }
}