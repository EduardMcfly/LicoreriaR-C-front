import { gql, QueryHookOptions, useQuery } from '@apollo/client';

import { QueryProductsArgs, Query } from '../types-graphql';
import { productFragment } from '../products/fragments';

export type TDataCartProducts = Pick<
  Query,
  'cartProducts' | '__typename'
>;
export const CART_PRODUCTS_QUERY = gql`
  query ($products: [ID!]!) {
    cartProducts(products: $products) {
      ...ProductFragment
    }
  }
  ${productFragment}
`;

type UseCartProductsProps = QueryHookOptions<
  TDataCartProducts,
  QueryProductsArgs
>;

export const useCartProducts = (props?: UseCartProductsProps) => {
  return useQuery<TDataCartProducts, QueryProductsArgs>(
    CART_PRODUCTS_QUERY,
    props,
  );
};
