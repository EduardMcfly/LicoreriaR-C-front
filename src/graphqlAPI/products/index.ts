import {
  gql,
  QueryHookOptions,
  useMutation,
  useQuery,
} from '@apollo/client';

import {
  QueryProductsArgs,
  Query,
  Mutation,
  MutationCreateProductArgs,
} from '../types-graphql';
import { productFragment } from './fragments';
import { QueryProductArgs } from '../types-graphql';

export type TDataProducts = Pick<Query, 'products' | '__typename'>;
export const PRODUCTS_QUERY = gql`
  query ($pagination: Pagination, $category: String) {
    products(pagination: $pagination, category: $category) {
      data {
        ...ProductFragment
      }
      cursor {
        after
        count
      }
    }
  }
  ${productFragment}
`;

type UseProductsProps = QueryHookOptions<
  TDataProducts,
  QueryProductsArgs
>;

export const useProducts = (props?: UseProductsProps) => {
  return useQuery<TDataProducts, QueryProductsArgs>(
    PRODUCTS_QUERY,
    props,
  );
};

export type TDataProduct = Pick<Query, 'product' | '__typename'>;
export const PRODUCT_QUERY = gql`
  query ($id: ID!) {
    product(id: $id) {
      ...ProductFragment
    }
  }
  ${productFragment}
`;

type UseProductProps = QueryHookOptions<
  TDataProduct,
  QueryProductArgs
>;

export const useProduct = (props?: UseProductProps) => {
  return useQuery<TDataProduct, QueryProductArgs>(
    PRODUCT_QUERY,
    props,
  );
};

export const CREATE_PRODUCT_MUTATION = gql`
  mutation ($product: ProductInput!) {
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
