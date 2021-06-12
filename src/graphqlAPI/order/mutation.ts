import { useMutation, gql } from '@apollo/client';
import { Mutation, MutationCreateOrderArgs } from '../types-graphql';

export const CREATE_ORDER_MUTATION = gql`
  mutation (
    $orderDate: DateTime!
    $client: String!
    $location: OrderLocationInput!
    $products: [ProductOrderInput!]!
  ) {
    createOrder(
      orderDate: $orderDate
      client: $client
      location: $location
      products: $products
    ) {
      id
      orderDate
    }
  }
`;

export const useCreateOrder = () => {
  return useMutation<
    Pick<Mutation, 'createOrder'>,
    MutationCreateOrderArgs
  >(CREATE_ORDER_MUTATION);
};
