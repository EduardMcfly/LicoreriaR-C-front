import qs from 'querystring';

import { useShop } from 'contexts';

export const useOnBuy = () => {
  const { products } = useShop();
  return () => {
    let text = `Hola\n`;
    text += `Estoy interad@ en comprar estos productos:\n`;
    for (const { id, amount } of products) {
      const cartProduct = products.find((x) => x.id === id);
      if (cartProduct) {
        const { product } = cartProduct;
        text += `${product.name}: ${amount}\n`;
      }
    }
    let url = 'https://wa.me/573204283576?';
    url += qs.stringify({ text });
    window.location.href = url;
  };
};

export enum Action {
  back = 'back',
  next = 'next',
  buy = 'buy',
}
