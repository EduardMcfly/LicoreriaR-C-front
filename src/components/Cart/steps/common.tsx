import qs from 'querystring';

import { useShop } from 'contexts';
import { ProductOrderInput, useCreateOrder } from 'graphqlAPI';
import { getUrlWhatsapp } from 'utils';
import { createRouteOrder } from '../../../constantsApp/index';
import { ApolloError } from '@apollo/client';

type OnBuy = [
  () => Promise<void>,
  {
    loading: boolean;
    error?: ApolloError;
  },
];

export const useOnBuy = (): OnBuy => {
  const { products, removeProducts, map, userInfo } = useShop();
  const [createOrder, { loading, error }] = useCreateOrder();
  const handler = async () => {
    const { center } = map;
    const { name, orderDate } = userInfo;
    if (!center || !orderDate || !name) return;
    const { lat, lng } = center;

    const { data, errors } = await createOrder({
      variables: {
        products: products.map<ProductOrderInput>(
          ({ id, amount }) => ({ id, amount }),
        ),
        client: name,
        location: { lat, lng },
        orderDate,
      },
    });
    const order = data?.createOrder;
    if (!order || errors) throw new Error('Error creating order');
    const { origin } = window.location;
    let text = `Hola\n`;
    text += `Esta es mi orden de compra:\n`;
    text += origin + createRouteOrder({ id: order.id });
    let url = getUrlWhatsapp();
    url += qs.stringify({ text });
    window.open(url, '_blank')?.focus();
    removeProducts();
  };
  return [handler, { loading, error }];
};

export enum Action {
  back = 'back',
  next = 'next',
  buy = 'buy',
}
