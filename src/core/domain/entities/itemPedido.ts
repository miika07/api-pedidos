import { Column } from 'typeorm';

export class ItemPedidoEntity {

    @Column()
    idProduto: string;

    @Column()
    quantidade: number;

    constructor(idProduto: string = '', quantidade: number = 0) {
        this.idProduto = idProduto;
        this.quantidade = quantidade;
    }
}
