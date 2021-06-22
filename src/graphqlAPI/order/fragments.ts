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
      image
      amount
      unitPrice
    }
    orderDate
    deliveryDate
  }
`;
