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
import {
  QueryProductArgs,
  MutationEditProductArgs,
} from '../types-graphql';

export type TDataProducts = Pick<Query, 'products' | '__typename'>;
export const PRODUCTS_QUERY = gql`
  query (
    $pagination: Pagination
    $category: String
    $filter: String
  ) {
    products(
      pagination: $pagination
      category: $category
      filter: $filter
    ) {
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
      ...ProductFragment
    }
  }
  ${productFragment}
`;

export const useCreateProduct = () => {
  return useMutation<
    Pick<Mutation, 'createProduct'>,
    MutationCreateProductArgs
  >(CREATE_PRODUCT_MUTATION, {
    refetchQueries: [{ query: PRODUCTS_QUERY }],
  });
};

export const EDIT_PRODUCT_MUTATION = gql`
  mutation ($id: ID!, $product: ProductEditInput!) {
    editProduct(id: $id, product: $product) {
      ...ProductFragment
    }
  }
  ${productFragment}
`;

export const useEditProduct = () => {
  return useMutation<
    Pick<Mutation, 'editProduct'>,
    MutationEditProductArgs
  >(EDIT_PRODUCT_MUTATION, {
    refetchQueries: [{ query: PRODUCTS_QUERY }],
  });
};
