import { gql, QueryHookOptions, useQuery } from '@apollo/client';

import { Query } from '../types-graphql';
import { orderFragment } from './fragments';

export type TDataOrder = Pick<Query, 'order' | '__typename'>;
export const ORDER_QUERY = gql`
  query ($id: ID!) {
    order(id: $id) {
      ...OrderFragment
    }
  }
  ${orderFragment}
`;

type UseOrderProps = QueryHookOptions<TDataOrder>;
export const useOrder = (props?: UseOrderProps) => {
  return useQuery<TDataOrder>(ORDER_QUERY, props);
};

export type TDataOrders = Pick<Query, 'orders' | '__typename'>;
export const ORDERS_QUERY = gql`
  query {
    orders {
      ...OrderFragment
    }
  }
  ${orderFragment}
`;

type UseOrdersProps = QueryHookOptions<TDataOrders>;
export const useOrders = (props?: UseOrdersProps) => {
  return useQuery<TDataOrders>(ORDERS_QUERY, props);
};

export * from './mutation';
