import { Entity, Column, ObjectIdColumn } from 'typeorm';
import { ItemPedidoEntity } from './itemPedido';
import { ObjectId } from 'mongodb';
import { v4 as uuidv4 } from 'uuid';

@Entity({ name: 'pedidos' })
export class PedidoEntity {
    @ObjectIdColumn()
    id: ObjectId;

    @Column()
    uuid: string;

    @Column()
    idCliente: string;

    @Column()
    status: string;

    @Column(type => ItemPedidoEntity)
    itensPedido: ItemPedidoEntity[];

    @Column()
    numeroPedido: number;

    @Column({ default: () => new Date() })
    public createdAt?: Date;

    @Column({ default: () => new Date() })
    public updatedAt?: Date;

    constructor(idCliente: string = null, status: string = '', itensPedido: ItemPedidoEntity[]) {
        this.id = new ObjectId();
        this.uuid = uuidv4();
        this.idCliente = idCliente;
        this.status = status;
        this.numeroPedido = Math.floor(Math.random() * 10000);
        this.itensPedido = itensPedido
    }
}
