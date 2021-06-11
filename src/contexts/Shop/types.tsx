import { Props as MapProps } from 'google-map-react';

import { Product } from 'graphqlAPI';

type UserMapBase = Pick<MapProps, 'center' | 'zoom'>;

export type UserMap = UserMapBase &
  Pick<MapProps, 'defaultCenter' | 'defaultZoom'>;

export interface UserInfo {
  name: string;
  orderDate: Date;
  orderTime: string;
}

export interface CartProductBase {
  id: Product['id'];
  amount: number;
}

export interface CartProduct extends CartProductBase {
  product: Product;
}
