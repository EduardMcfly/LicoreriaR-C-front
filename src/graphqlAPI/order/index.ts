import { gql, QueryHookOptions, useQuery } from '@apollo/client';

import { QueryOrderArgs, Query } from '../types-graphql';

export type TDataOrder = Pick<Query, 'order' | '__typename'>;
export const ORDER_PRODUCTS_QUERY = gql`
  query ($products: [ID!]!) {
    order(products: $products) {
      id
      location {
        lat
        lng
      }
      orderDate
    }
  }
`;

type UseOrderProps = QueryHookOptions<TDataOrder, QueryOrderArgs>;
export const useOrder = (props?: UseOrderProps) => {
  return useQuery<TDataOrder, QueryOrderArgs>(
    ORDER_PRODUCTS_QUERY,
    props,
  );
};

export type TDataOrders = Pick<Query, 'orders' | '__typename'>;
export const ORDERS_PRODUCTS_QUERY = gql`
  query {
    orders {
      id
      location {
        lat
        lng
      }
      products {
        id
        name
        amount
        unitPrice
      }
      orderDate
      deliveryDate
    }
  }
`;

type UseOrdersProps = QueryHookOptions<TDataOrders>;
export const useOrders = (props?: UseOrdersProps) => {
  return useQuery<TDataOrders>(ORDERS_PRODUCTS_QUERY, props);
};

export * from './mutation';
