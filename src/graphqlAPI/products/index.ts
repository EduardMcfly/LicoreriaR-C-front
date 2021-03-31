import { gql, useQuery } from '@apollo/client';
import { Query } from '../types-graphql';

export type TDataProducts = Pick<Query, 'products' | '__typename'>;
export const PRODUCTS_QUERY = gql`
  query {
    products {
      id
      name
      description
      price
    }
  }
`;

export const useProducts = () => {
  return useQuery<TDataProducts>(PRODUCTS_QUERY);
};
