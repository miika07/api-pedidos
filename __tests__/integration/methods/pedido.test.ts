import { route, TestRouteOptions } from '../../common';
import { v4 as uuidv4 } from 'uuid';

// it('[POST] Adicionar um pedido - 200', async () => {
//     //adicionando pedido
//     const paramsPedido: TestRouteOptions = {
//         method: 'POST',
//         url: 'api/pedido',
//         basePath: '',
//         payload: {
//           cliente: uuidv4(),
//           status: "Recebido",
//           itensPedido: [
//             {
//                 idProduto: uuidv4(),
//                 quantidade: 3
//             },
//             {
//                 idProduto: uuidv4(),
//                 quantidade: 3
//             }
//           ]
//         }
//       };
//       const responsePedido = await route(paramsPedido);
//       expect(responsePedido.statusCode).toBe(200);
//       expect(responsePedido.payload.itensPedido).toHaveLength(2)
//   });

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

  // it('[GET] Buscar todos os pedidos - 200', async () => {
  //   const params: TestRouteOptions = {
  //     method: 'GET',
  //     url: 'api/pedidos',
  //     basePath: ''
  //   };
    
  //   const { payload, statusCode } = await route(params);
  //   expect(statusCode).toBe(200);
  //   expect(payload).toHaveLength(1);
  // });

  // it('[GET] Buscar todos os pedidos por status - 200', async () => {
  //   const params: TestRouteOptions = {
  //     method: 'GET',
  //     url: 'api/pedido/status/Recebido',
  //     basePath: ''
  //   };
    
  //   const { payload, statusCode } = await route(params);
  //   expect(statusCode).toBe(200);
  //   expect(payload).toHaveLength(1);
  // });

  // it('[GET] Erro ao buscar todos os pedidos por status - 404', async () => {
  //   const params: TestRouteOptions = {
  //     method: 'GET',
  //     url: 'api/pedido/status/Finalizado',
  //     basePath: ''
  //   };
    
  //   const { payload, statusCode } = await route(params);
  //   expect(statusCode).toBe(404);
  // });

  // it('[GET] Buscar pedido por ID - 200', async () => {
  //   const params: TestRouteOptions = {
  //     method: 'GET',
  //     url: 'api/pedidos',
  //     basePath: ''
  //   };
    
  //   const response = await route(params);
  //   expect(response.statusCode).toBe(200);

  //   const paramsId: TestRouteOptions = {
  //     method: 'GET',
  //     url: `api/pedido/${response.payload[0].id}`,
  //     basePath: '',
  //     query: {
  //       id:response.payload.id
  //     }
  //   };
  //   const { payload, statusCode } = await route(paramsId);
  //   expect(statusCode).toBe(200);
  //   expect(payload.status).toBe('Recebido');
  // });

  // it('[PUT] Atualizar pedido por ID - 200', async () => {
  //   //buscar pedido
  //   const params: TestRouteOptions = {
  //     method: 'GET',
  //     url: 'api/pedidos',
  //     basePath: ''
  //   };
    
  //   const response = await route(params);
  //   expect(response.statusCode).toBe(200);
   
  //   //Atualizar o pedido
  //   const paramsId: TestRouteOptions = {
  //     method: 'PUT',
  //     url: `api/pedido/${response.payload[0].id}`,
  //     basePath: '',
  //     payload: {
  //       cliente: response.payload[0].idCliente.id,
  //       status: 'Pronto',
  //       itensPedido:[{
  //           idProduto: response.payload[0].itensPedido[0].idProduto.id,
  //           quantidade: 2
  //       },
  //       {
  //           idProduto: response.payload[0].itensPedido[1].idProduto.id,
  //           quantidade: 2
  //       }]
  //     }
  //   };
  //   const { payload, statusCode } = await route(paramsId);
  //   expect(statusCode).toBe(200);
  //   expect(payload.itensPedido).toHaveLength(2);
  //   expect(payload.status).toBe('Pronto');
  // });

  // it('[PUT] Remover item do pedido - 200', async () => {
  //   //buscar pedido
  //   const params: TestRouteOptions = {
  //     method: 'GET',
  //     url: 'api/pedidos',
  //     basePath: ''
  //   };
    
  //   const response = await route(params);
  //   expect(response.statusCode).toBe(200);
   
  //   //Atualizar o pedido
  //   const paramsId: TestRouteOptions = {
  //     method: 'PUT',
  //     url: `api/pedido/${response.payload[0].id}`,
  //     basePath: '',
  //     payload: {
  //       cliente: response.payload[0].idCliente.id,
  //       status: 'Pronto',
  //       itensPedido:[{
  //           idProduto: response.payload[0].itensPedido[0].idProduto.id,
  //           quantidade: 3
  //       }]
  //     }
  //   };
  //   const { payload, statusCode } = await route(paramsId);
  //   expect(statusCode).toBe(200);
  //   expect(payload.itensPedido).toHaveLength(1);
  //   expect(payload.itensPedido[0].quantidade).toBe(3)
  //   expect(payload.status).toBe('Pronto');
  // });

  // it('[DELETE] Deletar pedido por ID - 204', async () => {
  //   const params: TestRouteOptions = {
  //     method: 'GET',
  //     url: 'api/pedidos',
  //     basePath: ''
  //   };
    
  //   const response = await route(params);
  //   expect(response.statusCode).toBe(200);

  //   const paramsId: TestRouteOptions = {
  //     method: 'DELETE',
  //     url: `api/pedido/${response.payload[0].id}`,
  //     basePath: ''
  //   };
  //   const { statusCode } = await route(paramsId);
  //   expect(statusCode).toBe(204);

  //   const responseAfter = await route(params);
  //   expect(responseAfter.statusCode).toBe(200);
  //   expect(responseAfter.payload).toHaveLength(0);
  // });
