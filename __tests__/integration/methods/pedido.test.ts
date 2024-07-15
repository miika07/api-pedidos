import { route, TestRouteOptions } from '../../common';
import { v4 as uuidv4 } from 'uuid';

it('[POST] Adicionar um pedido - 200', async () => {
    //adicionando pedido
    const paramsPedido: TestRouteOptions = {
        method: 'POST',
        url: 'api/pedido',
        basePath: '',
        payload: {
          cliente: uuidv4(),
          status: "RECEBIDO",
          itensPedido: [
            {
                idProduto: uuidv4(),
                quantidade: 1
            },
            {
                idProduto: uuidv4(),
                quantidade: 1
            }
          ]
        }
      };
      const responsePedido = await route(paramsPedido);
      expect(responsePedido.statusCode).toBe(200);
      expect(responsePedido.payload.itensPedido).toHaveLength(2)
  });

  it('[POST] Erro ao adicionar um pedido vazio- 400', async () => {
    //adicionando pedido
    const paramsPedido: TestRouteOptions = {
        method: 'POST',
        url: 'api/pedido',
        basePath: '',
        payload: {
          cliente: uuidv4(),
          status: "Recebido",
          itensPedido: []
        }
      };
      const responsePedido = await route(paramsPedido);
      expect(responsePedido.statusCode).toBe(400);
      expect(responsePedido.payload.error).toBe('Bad Request');
  });

  it('[GET] Buscar todos os pedidos - 200', async () => {
    //adicionando pedido para poder buscar
    const paramsPedido: TestRouteOptions = {
      method: 'POST',
      url: 'api/pedido',
      basePath: '',
      payload: {
        cliente: uuidv4(),
        status: "RECEBIDO",
        itensPedido: [
          {
              idProduto: uuidv4(),
              quantidade: 1
          },
          {
              idProduto: uuidv4(),
              quantidade: 1
          }
        ]
      }
    };
    const responsePedido = await route(paramsPedido);
    expect(responsePedido.statusCode).toBe(200);

    const params: TestRouteOptions = {
      method: 'GET',
      url: 'api/pedidos',
      basePath: ''
    };
    
    const { payload, statusCode } = await route(params);
    expect(statusCode).toBe(200);
    expect(payload.length).toBeGreaterThanOrEqual(1);
  });

  it('[GET] Buscar todos os pedidos por status - 200', async () => {
    //adicionando pedido para poder buscar
    const paramsPedido: TestRouteOptions = {
      method: 'POST',
      url: 'api/pedido',
      basePath: '',
      payload: {
        cliente: uuidv4(),
        status: "RECEBIDO",
        itensPedido: [
          {
              idProduto: uuidv4(),
              quantidade: 2
          }
        ]
      }
    };
    const responsePedido = await route(paramsPedido);
    expect(responsePedido.statusCode).toBe(200);

    const params: TestRouteOptions = {
      method: 'GET',
      url: 'api/pedido/status/RECEBIDO',
      basePath: ''
    };
    
    const responseTest = await route(params);
    expect(responseTest.statusCode).toBe(200);
    expect(responseTest.payload.length).toBeGreaterThanOrEqual(1);
  });

  it('[GET] Erro ao buscar todos os pedidos por status - 404', async () => {
    const params: TestRouteOptions = {
      method: 'GET',
      url: 'api/pedido/status/FINALIZADO',
      basePath: ''
    };
    const { payload, statusCode } = await route(params);
    expect(statusCode).toBe(404);
  });

  it('[GET] Buscar pedido por ID - 200', async () => {
    //adicionando pedido para poder buscar
    const paramsPedido: TestRouteOptions = {
      method: 'POST',
      url: 'api/pedido',
      basePath: '',
      payload: {
        cliente: uuidv4(),
        status: "RECEBIDO",
        itensPedido: [
          {
              idProduto: uuidv4(),
              quantidade: 2
          }
        ]
      }
    };
    const responsePedido = await route(paramsPedido);
    const uuidPedido = responsePedido.payload.uuid;
    expect(responsePedido.statusCode).toBe(200);
    
    const paramsId: TestRouteOptions = {
      method: 'GET',
      url: `api/pedido/${uuidPedido}`,
      basePath: '',
      query: {
        uuid:uuidPedido
      }
    };
    const { payload, statusCode } = await route(paramsId);
    expect(statusCode).toBe(200);
    expect(payload.status).toBe('Recebido');
  });

  it('[PUT] Atualizar pedido por ID - 200', async () => {
    //Adicionando pedido
    const paramsPedido: TestRouteOptions = {
      method: 'POST',
      url: 'api/pedido',
      basePath: '',
      payload: {
        cliente: uuidv4(),
        status: "RECEBIDO",
        itensPedido: [
          {
              idProduto: uuidv4(),
              quantidade: 6
          }
        ]
      }
    };
    const responsePedido = await route(paramsPedido);
    expect(responsePedido.statusCode).toBe(200);

    let payloadPedido = responsePedido.payload;
    payloadPedido.itensPedido[0].quantidade = 5;
    payloadPedido.status = "PRONTO";

    //Atualizar o pedido
    const paramsId: TestRouteOptions = {
      method: 'PUT',
      url: `api/pedido/${responsePedido.payload.uuid}`,
      basePath: '',
      payload: {
        cliente: payloadPedido.idCliente,
        status: payloadPedido.status,
        itensPedido: payloadPedido.itensPedido
      }
    };
    const resultAtualizar = await route(paramsId);
    expect(resultAtualizar.statusCode).toBe(200);
    expect(resultAtualizar.payload.itensPedido[0].quantidade).toEqual(5);

    expect(resultAtualizar.payload.status).toBe('Pronto');
  });

  it('[PUT] Remover item do pedido - 200', async () => {
    //Adicionando pedido
    const paramsPedido: TestRouteOptions = {
      method: 'POST',
      url: 'api/pedido',
      basePath: '',
      payload: {
        cliente: uuidv4(),
        status: "RECEBIDO",
        itensPedido: [
          {
              idProduto: uuidv4(),
              quantidade: 6
          }
        ]
      }
    };
    const responsePedido = await route(paramsPedido);
    expect(responsePedido.statusCode).toBe(200);
   
    //Atualizar o pedido
    const paramsId: TestRouteOptions = {
      method: 'PUT',
      url: `api/pedido/${responsePedido.payload.uuid}`,
      basePath: '',
      payload: {
        cliente: responsePedido.payload.idCliente,
        status: 'PRONTO',
        itensPedido:[{
            idProduto: responsePedido.payload.itensPedido[0].idProduto,
            quantidade: 3
        }]
      }
    };
    const { payload, statusCode } = await route(paramsId);
    expect(statusCode).toBe(200);
    expect(payload.itensPedido).toHaveLength(1);
    expect(payload.itensPedido[0].quantidade).toBe(3)
    expect(payload.status).toBe('Pronto');
  });

  it('[DELETE] Deletar pedido por ID - 204', async () => {
    //adicionando pedido para poder buscar
    const paramsPedido: TestRouteOptions = {
      method: 'POST',
      url: 'api/pedido',
      basePath: '',
      payload: {
        cliente: uuidv4(),
        status: "RECEBIDO",
        itensPedido: [
          {
              idProduto: uuidv4(),
              quantidade: 2
          }
        ]
      }
    };
    const responsePedido = await route(paramsPedido);
    const uuidPedido = responsePedido.payload.uuid;
    expect(responsePedido.statusCode).toBe(200);

    const paramsId: TestRouteOptions = {
      method: 'DELETE',
      url: `api/pedido/${uuidPedido}`,
      basePath: ''
    };
    const result = await route(paramsId);
    console.log(result);
    expect(result.statusCode).toBe(204);

    const paramsGet: TestRouteOptions = {
      method: 'GET',
      url: `api/pedido/${uuidPedido}`,
      basePath: '',
      query: {
        uuid:uuidPedido
      }
    };

    const responseAfter = await route(paramsGet);
    expect(responseAfter.statusCode).toBe(404);
  });


