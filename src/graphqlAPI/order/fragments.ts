import { gql } from '@apollo/client';

export const orderFragment = gql`
  fragment OrderFragment on Order {
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
`;
