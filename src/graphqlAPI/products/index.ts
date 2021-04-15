import { gql, useMutation, useQuery } from '@apollo/client';
import {
  Query,
  Mutation,
  MutationCreateProductArgs,
} from '../types-graphql';

export type TDataProducts = Pick<Query, 'products' | '__typename'>;
export const PRODUCTS_QUERY = gql`
  query {
    products {
      id
      name
      image
      description
      price
    }
  }
`;

export const useProducts = () => {
  return useQuery<TDataProducts>(PRODUCTS_QUERY);
};
export const CREATE_PRODUCT_MUTATION = gql`
  mutation($product: ProductInput!) {
    createProduct(product: $product) {
      id
      name
    }
  }
`;

export const useCreateProduct = () => {
  return useMutation<
    Pick<Mutation, 'createProduct'>,
    MutationCreateProductArgs
  >(CREATE_PRODUCT_MUTATION, {
    refetchQueries: [{ query: PRODUCTS_QUERY }],
  });
};
